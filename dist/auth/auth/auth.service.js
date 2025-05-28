"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const config_1 = require("@nestjs/config");
const bcrypt_1 = require("bcrypt");
let AuthService = class AuthService {
    jwtService;
    configService;
    userModel;
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async login(email, password) {
        const user = await this.userModel.findOne({ email: email }).lean();
        if (!user)
            throw new common_1.UnauthorizedException('Check email or password then try again');
        const isMatching = await (0, bcrypt_1.compare)(password, user.password);
        if (!isMatching)
            throw new common_1.UnauthorizedException('Check email or password then try again');
        const payload = {
            sub: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
        return await this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_SECRET'),
        });
    }
    async tokenIsValid(token) {
        try {
            await this.jwtService.verifyAsync(token, {
                secret: this.configService.get('JWT_SECRET'),
            });
            return true;
        }
        catch (err) {
            console.log('TOKEN VALIDATION CHECK ERROR');
            console.log(err);
            return false;
        }
    }
};
exports.AuthService = AuthService;
__decorate([
    (0, mongoose_1.InjectModel)('User'),
    __metadata("design:type", mongoose_2.Model)
], AuthService.prototype, "userModel", void 0);
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map