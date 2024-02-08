export function convert(data: {coins: string, discordId: string}) {
    return new Promise((resolve, reject) => {
        fetch(`${process.env?.CHROUMECON_URI}/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: process.env?.CHORUMECON_USER,
                password: process.env?.CHROUMECON_PASSWORD
            })
        }).then(res => {
            if(res.status != 200) {
                return reject();
            }
            return res.json();
        })
        .then(d => d.token)
        .then(t => {
            const h = new Headers();
            h.set('Authorization', `Bearer ${t}`);
            return fetch(`${process.env?.CHROUMECON_URI}/bonify`, {
                headers: h,
                body: JSON.stringify({
                    coins: Number.parseInt(data.coins, 10),
                    discordId: data.discordId
                }),
                method: 'POST'
            })
            .then(r => r.json())
            .then(b => {
                if(b.status != 200) {
                    return reject(b.message);
                }
                return resolve(b.chorumecoins);
            });
        });
    });
}


export async function POST(req: Request) {
    const body = await req.json();
    const {coins, discordId} = body;
    if(coins <= 0) {
        return Response.json({
            status: 422,
            message: 'Deve ser fornecido um valor >= 0'
        }, {
            status: 422
        });
    }
    try {
        const chorumecoins = await convert({
            coins: '10',
            discordId
        });
        return Response.json({
            chorumecoins
        })
    } catch(err: unknown) {
        return Response.json({
            status: 500,
            message: err
        })
    }
}