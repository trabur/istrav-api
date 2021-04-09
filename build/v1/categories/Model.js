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
const Model_2 = __importDefault(require("../products/Model"));
let Category = class Category extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Category.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "uuid", nullable: false }),
    __metadata("design:type", String)
], Category.prototype, "appId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Model_1.default, app => app.categories),
    typeorm_1.JoinColumn({ name: "appId" }),
    __metadata("design:type", Model_1.default)
], Category.prototype, "app", void 0);
__decorate([
    typeorm_1.OneToMany(() => Model_2.default, product => product.category),
    __metadata("design:type", Array)
], Category.prototype, "products", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Category.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Category.prototype, "image", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Category.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Category.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.DeleteDateColumn(),
    __metadata("design:type", Date)
], Category.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.VersionColumn(),
    __metadata("design:type", Number)
], Category.prototype, "version", void 0);
Category = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["app", "slug"])
], Category);
exports.default = Category;
//# sourceMappingURL=Model.js.map