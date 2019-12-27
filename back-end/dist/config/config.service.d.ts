export declare type EnvConfig = Record<string, string>;
export declare class ConfigService {
    private readonly logger;
    private readonly envConfig;
    static service: ConfigService;
    constructor(filePath?: string);
    static getInstance(): ConfigService;
    private validateInput;
    get(key: string): string;
    get environment(): string;
    get awsRegion(): string;
}
