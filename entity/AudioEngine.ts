import EventEmitter from "events";
import { GameConfigs } from "./GameConfigs";
import { AudioBackground } from "./audios/AudioBackground";
import { AudioSoundEffect } from "./audios/AudioSoundEffect";
import { AudioStatus } from "./audios/AudioStatus";

export default class AudioEngine extends EventEmitter {
    private backgroundAudio: HTMLAudioElement | null = null;
    private reproducingBackgroundAudio: boolean = false;
    private soundState: AudioStatus = AudioStatus.DISABLED;
    
    constructor() {
        super();
        this.on('enabled', () => this.playAgain());
        this.on('disabled', () => this.pauseBackgroundAudio())
    }
    pauseBackgroundAudio() {
        if(!this.backgroundAudio || !this.playingBackground) {
            return;
        }
        this.backgroundAudio.pause();
        this.reproducingBackgroundAudio = false;
    }
    playAgain() {
        if(!this.backgroundAudio || !this.audioEnabled) {
            return;  
        }
        const source = this.backgroundAudio.src as AudioBackground;
        this.backgroundAudio = null;
        this.playBackground(source);;
    }
    enable(): void {
        this.soundState = AudioStatus.ENABLED;
        this.emit('enabled');
    }

    disabled(): void {
        this.soundState = AudioStatus.DISABLED;
        this.emit('disabled');
    }

    get audioEnabled(): boolean {
        return this.soundState == AudioStatus.ENABLED;
    }

    get playingBackground(): boolean {
        return this.reproducingBackgroundAudio;
    }

    playBackground(audio: AudioBackground): void {
        if(this.reproducingBackgroundAudio || !this.audioEnabled) {
            return;
        }
        const backgroundAudio = new Audio(audio);
        backgroundAudio.loop = true;
        backgroundAudio.currentTime = 0;
        backgroundAudio.volume = GameConfigs.BACKGROUND_MUSIC_VOLUME;
        backgroundAudio.play();
        this.backgroundAudio = backgroundAudio;
        this.reproducingBackgroundAudio = true;
    }
    
    playSoundEffect(audio: AudioSoundEffect): void { 
        if(!this.audioEnabled) {
            return;
        }
        const soundEffect = new Audio(audio);
        soundEffect.volume = GameConfigs.SOUND_EFFECT_VOLUME;
        soundEffect.play();
    }

    stopCurrentBackgroundMusic() {
        if(!this.backgroundAudio || !this.playingBackground || !this.audioEnabled) {
            return;
        }
        this.backgroundAudio.pause();
    }

}