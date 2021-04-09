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
const Model_1 = __importDefault(require("../licenses/Model"));
const Model_2 = __importDefault(require("../apps/Model"));
let Plan = class Plan extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Plan.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "uuid", nullable: false }),
    __metadata("design:type", String)
], Plan.prototype, "appId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Model_2.default, app => app.plans),
    typeorm_1.JoinColumn({ name: "appId" }),
    __metadata("design:type", Model_2.default)
], Plan.prototype, "app", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: 'FREE!' }),
    __metadata("design:type", String)
], Plan.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ nullable: false, default: 'free' }),
    __metadata("design:type", String)
], Plan.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Plan.prototype, "price", void 0);
__decorate([
    typeorm_1.Column({ type: "json", nullable: true }),
    __metadata("design:type", String)
], Plan.prototype, "details", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Plan.prototype, "purchaseUrl", void 0);
__decorate([
    typeorm_1.OneToMany(() => Model_1.default, license => license.plan),
    __metadata("design:type", Array)
], Plan.prototype, "licenses", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Plan.prototype, "grantMarketing", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Plan.prototype, "grantShop", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Plan.prototype, "grantForum", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Plan.prototype, "grantBlog", void 0);
__decorate([
    typeorm_1.Column({ default: true }),
    __metadata("design:type", Boolean)
], Plan.prototype, "grantPromo", void 0);
__decorate([
    typeorm_1.Column({ default: 45 }),
    __metadata("design:type", Number)
], Plan.prototype, "limitOnlineVisitors", void 0);
__decorate([
    typeorm_1.Column({ default: 3 }),
    __metadata("design:type", Number)
], Plan.prototype, "limitFileStorage", void 0);
__decorate([
    typeorm_1.Column({ default: 2 }),
    __metadata("design:type", Number)
], Plan.prototype, "limitEventSources", void 0);
__decorate([
    typeorm_1.Column({ default: 1 }),
    __metadata("design:type", Number)
], Plan.prototype, "limitDatabaseRecords", void 0);
__decorate([
    typeorm_1.Column({ type: "json", nullable: true }),
    __metadata("design:type", String)
], Plan.prototype, "raw", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Plan.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Plan.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.DeleteDateColumn(),
    __metadata("design:type", Date)
], Plan.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.VersionColumn(),
    __metadata("design:type", Number)
], Plan.prototype, "version", void 0);
Plan = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["app", "slug"])
], Plan);
exports.default = Plan;
//# sourceMappingURL=Model.js.map