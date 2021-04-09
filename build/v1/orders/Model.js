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
const Model_1 = __importDefault(require("../apps/Model"));
const Model_2 = __importDefault(require("../users/Model"));
const Model_3 = __importDefault(require("../products/Model"));
let Order = class Order extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "uuid", nullable: false }),
    __metadata("design:type", String)
], Order.prototype, "appId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Model_1.default, app => app.users),
    typeorm_1.JoinColumn({ name: "appId" }),
    __metadata("design:type", Model_1.default)
], Order.prototype, "app", void 0);
__decorate([
    typeorm_1.Column({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "userId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Model_2.default, user => user.orders),
    typeorm_1.JoinColumn({ name: "userId" }),
    __metadata("design:type", Model_2.default)
], Order.prototype, "user", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Model_3.default, product => product.orders),
    __metadata("design:type", Array)
], Order.prototype, "products", void 0);
__decorate([
    typeorm_1.Column({ type: "json", nullable: true }),
    __metadata("design:type", String)
], Order.prototype, "raw", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Order.prototype, "placedAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Order.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.DeleteDateColumn(),
    __metadata("design:type", Date)
], Order.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.VersionColumn(),
    __metadata("design:type", Number)
], Order.prototype, "version", void 0);
Order = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["app", "user", "placedAt"])
], Order);
exports.default = Order;
//# sourceMappingURL=Model.js.map