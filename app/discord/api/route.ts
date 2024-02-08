const baseURL = 'https://discord.com/oauth2';

interface AuthorizeDiscord {
    clientId: string;
    redirectUri: string;
}

function createOAuthURL() {
    const clientId = process.env?.CLIENT_ID ?? '';
    const redirectUri = process.env?.REDIRECT_URI ?? '';
    const authorize = baseURL + `/authorize?response_type=code&client_id=${clientId}&scope=identify&redirect_uri=${encodeURI(redirectUri)}&prompt=consent`;
    return authorize;
}

async function user(token: string):Promise<{username: string, id: string}> {
    try {
        const h = new Headers();
        h.set('Authorization', 'Bearer ' + token);
        const r = await fetch('https://discord.com/api/users/@me', {
            method: 'GET',
            headers: h
        })
        const body = await r.json();
        return { 
            username: body.username as string,
            id: body.id as string,
        }
    } catch(err: unknown) {
        console.error('Error during fetch operation: ', err);
        return {
            id: '',
            username: ''
        };
    }
}

async function exchangeCode(code: string): Promise<string> {
    const data = new URLSearchParams();
    data.append('grant_type', 'authorization_code');
    data.append('code', code);
    data.append('redirect_uri', process.env?.REDIRECT_URI ?? '');

    const headers = new Headers();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers.set('Authorization', `Basic ${btoa(`${process.env?.CLIENT_ID}:${process.env?.CLIENT_SECRET}`)}`)
    try {
        const response = await fetch(`https://discord.com/api/oauth2/token`, {
            method: 'POST',
            headers: headers,
            body: data,
        });
        if (!response.ok) {
            throw new Error('HTTP error! status: ' + response.status);
        }
        const body = await response.json();
        return body.access_token;
    } catch (error) {
        console.error('Error during fetch operation: ', error);
        return '';
    }
}

export function GET(request: Request) {
    return Response.json({
        url: createOAuthURL()
    });
}

export async function POST(request: Request) {
    const data = await request.json()
    const {code} = data;
    if(!code) {
        return Response.json({
            'message': 'No code was provided'
        }, {
            status: 422
        })
    }
    const token =  await exchangeCode(code);
    if(!token) {
        return Response.json({
            status: 500,
            message: 'Unknown error'
        }, {status: 500});
    }
    const userdata  = await user(token)
    if(userdata.id == '') {
        return Response.json({
            status: 500,
            message: 'Unknown error'
        }, {status: 500});
    }
    return Response.json(userdata)
}