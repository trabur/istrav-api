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
const Model_1 = __importDefault(require("../members/Model"));
const Model_2 = __importDefault(require("../users/Model"));
const Model_3 = __importDefault(require("../vehicles/Model"));
const Model_4 = __importDefault(require("../categories/Model"));
const Model_5 = __importDefault(require("../collections/Model"));
const Model_6 = __importDefault(require("../products/Model"));
const Model_7 = __importDefault(require("../menus/Model"));
const Model_8 = __importDefault(require("../pages/Model"));
const Model_9 = __importDefault(require("../carts/Model"));
const Model_10 = __importDefault(require("../orders/Model"));
const Model_11 = __importDefault(require("../licenses/Model"));
const Model_12 = __importDefault(require("../plans/Model"));
const Model_13 = __importDefault(require("../videos/Model"));
const Model_14 = __importDefault(require("../guides/Model"));
const class_validator_1 = require("class-validator");
let App = class App extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], App.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    class_validator_1.Length(4, 20),
    typeorm_1.Index({ unique: true }),
    __metadata("design:type", String)
], App.prototype, "endpoint", void 0);
__decorate([
    typeorm_1.Column({ type: "uuid", nullable: false }),
    __metadata("design:type", String)
], App.prototype, "ownerId", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Model_1.default, member => member.apps),
    typeorm_1.JoinColumn({ name: "ownerId" }),
    __metadata("design:type", Model_1.default)
], App.prototype, "owner", void 0);
__decorate([
    typeorm_1.OneToMany(() => Model_2.default, user => user.app),
    __metadata("design:type", Array)
], App.prototype, "users", void 0);
__decorate([
    typeorm_1.OneToMany(() => Model_3.default, vehicle => vehicle.app),
    __metadata("design:type", Array)
], App.prototype, "vehicles", void 0);
__decorate([
    typeorm_1.OneToMany(() => Model_4.default, category => category.app),
    __metadata("design:type", Array)
], App.prototype, "categories", void 0);
__decorate([
    typeorm_1.OneToMany(() => Model_5.default, collection => collection.app),
    __metadata("design:type", Array)
], App.prototype, "collections", void 0);
__decorate([
    typeorm_1.OneToMany(() => Model_6.default, product => product.app),
    __metadata("design:type", Array)
], App.prototype, "products", void 0);
__decorate([
    typeorm_1.OneToMany(() => Model_11.default, license => license.app),
    __metadata("design:type", Array)
], App.prototype, "licenses", void 0);
__decorate([
    typeorm_1.OneToMany(() => Model_12.default, plan => plan.app),
    __metadata("design:type", Array)
], App.prototype, "plans", void 0);
__decorate([
    typeorm_1.OneToMany(() => Model_7.default, menu => menu.app),
    __metadata("design:type", Array)
], App.prototype, "menus", void 0);
__decorate([
    typeorm_1.OneToMany(() => Model_8.default, page => page.app),
    __metadata("design:type", Array)
], App.prototype, "pages", void 0);
__decorate([
    typeorm_1.OneToMany(() => Model_9.default, cart => cart.app),
    __metadata("design:type", Array)
], App.prototype, "carts", void 0);
__decorate([
    typeorm_1.OneToMany(() => Model_10.default, order => order.app),
    __metadata("design:type", Array)
], App.prototype, "orders", void 0);
__decorate([
    typeorm_1.OneToMany(() => Model_13.default, video => video.app),
    __metadata("design:type", Array)
], App.prototype, "videos", void 0);
__decorate([
    typeorm_1.OneToMany(() => Model_14.default, guide => guide.app),
    __metadata("design:type", Array)
], App.prototype, "guides", void 0);
__decorate([
    typeorm_1.Column({ type: "json", nullable: true }),
    __metadata("design:type", String)
], App.prototype, "raw", void 0);
__decorate([
    typeorm_1.Column({ type: "json", nullable: true }),
    __metadata("design:type", String)
], App.prototype, "brands", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], App.prototype, "domain", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], App.prototype, "state", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], App.prototype, "uploads", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], App.prototype, "tawkToPropertyId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], App.prototype, "tawkToChatId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], App.prototype, "googleAnalyticsMeasurementId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], App.prototype, "image", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], App.prototype, "line1", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], App.prototype, "line2", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], App.prototype, "buttonName", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], App.prototype, "buttonUrl", void 0);
__decorate([
    typeorm_1.Column({ default: false }),
    __metadata("design:type", Boolean)
], App.prototype, "isStripeTestData", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], App.prototype, "stripePublishableKeyTest", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], App.prototype, "stripeSecretKeyTest", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], App.prototype, "stripePublishableKeyLive", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], App.prototype, "stripeSecretKeyLive", void 0);
__decorate([
    typeorm_1.Column({ type: "uuid", nullable: true }),
    __metadata("design:type", String)
], App.prototype, "licenseId", void 0);
__decorate([
    typeorm_1.OneToOne(() => Model_11.default),
    typeorm_1.JoinColumn({ name: "licenseId" }),
    __metadata("design:type", Model_11.default)
], App.prototype, "license", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], App.prototype, "licenseKey", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], App.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], App.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.DeleteDateColumn(),
    __metadata("design:type", Date)
], App.prototype, "deletedAt", void 0);
__decorate([
    typeorm_1.Column(),
    typeorm_1.VersionColumn(),
    __metadata("design:type", Number)
], App.prototype, "version", void 0);
App = __decorate([
    typeorm_1.Entity(),
    typeorm_1.Unique(["domain", "state"]),
    typeorm_1.Unique(["license"])
], App);
exports.default = App;
//# sourceMappingURL=Model.js.map