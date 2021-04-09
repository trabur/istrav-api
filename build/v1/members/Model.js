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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const Model_1 = __importDefault(require("../apps/Model"));
let Member = class Member extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Member.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.Index({ unique: true }),
    __metadata("design:type", String)
], Member.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.Length(4, 20),
    typeorm_1.Index({ unique: true }),
    __metadata("design:type", String)
], Member.prototype, "username", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.Length(4, 100),
    __metadata("design:type", String)
], Member.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Member.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Member.prototype, "lastName", void 0);
__decorate([
    typeorm_1.OneToMany(() => Model_1.default, app => app.owner),
    __metadata("design:type", Array)
], Member.prototype, "apps", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Member.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Member.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.DeleteDateColumn(),
    __metadata("design:type", Date)
], Member.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.VersionColumn(),
    __metadata("design:type", Number)
], Member.prototype, "version", void 0);
Member = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["firstName", "lastName"])
], Member);
exports.default = Member;
//# sourceMappingURL=Model.js.map