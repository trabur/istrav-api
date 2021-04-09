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
const Model_2 = __importDefault(require("../categories/Model"));
const Model_3 = __importDefault(require("../collections/Model"));
const Model_4 = __importDefault(require("../carts/Model"));
const Model_5 = __importDefault(require("../orders/Model"));
let Product = class Product extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "uuid", nullable: false }),
    __metadata("design:type", String)
], Product.prototype, "appId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Model_1.default, app => app.users),
    typeorm_1.JoinColumn({ name: "appId" }),
    __metadata("design:type", Model_1.default)
], Product.prototype, "app", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "slug", void 0);
__decorate([
    typeorm_1.Column({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "categoryId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Model_2.default, category => category.products),
    typeorm_1.JoinColumn({ name: "categoryId" }),
    __metadata("design:type", Model_2.default)
], Product.prototype, "category", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Model_3.default, collection => collection.products),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Product.prototype, "collections", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Model_4.default, cart => cart.products),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Product.prototype, "carts", void 0);
__decorate([
    typeorm_1.ManyToMany(() => Model_5.default, order => order.products),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Product.prototype, "orders", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "image", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "details", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "isPublished", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], Product.prototype, "isNotForSale", void 0);
__decorate([
    typeorm_1.Column({ default: 1 }),
    __metadata("design:type", Number)
], Product.prototype, "inStockCount", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "url", void 0);
__decorate([
    typeorm_1.Column({ type: 'json', nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "gallery", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.DeleteDateColumn(),
    __metadata("design:type", Date)
], Product.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.VersionColumn(),
    __metadata("design:type", Number)
], Product.prototype, "version", void 0);
Product = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["app", "slug"])
], Product);
exports.default = Product;
//# sourceMappingURL=Model.js.map