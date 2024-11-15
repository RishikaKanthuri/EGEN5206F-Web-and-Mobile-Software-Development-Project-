import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    candidateLogin(body: any): Promise<{
        access_token: string;
        candidateId: any;
        email: any;
    }>;
}
