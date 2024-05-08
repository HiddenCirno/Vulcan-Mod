"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const BaseClasses_1 = require("C:/snapshot/project/obj/models/enums/BaseClasses");
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const Traders_1 = require("C:/snapshot/project/obj/models/enums/Traders");
//import { ITraderConfig, UpdateTime } from "C:/snapshot/project/obj/models/spt/config/ITraderConfig";
//
const baseJson = __importStar(require("../db/traders/Persicaria/base.json"));
//
class Mod {
    //Traders["Persiciria"] = "Persiciria";
    preAkiLoad(container) {
        const Logger = container.resolve("WinstonLogger");
        const PreAkiModLoader = container.resolve("PreAkiModLoader");
        const configServer = container.resolve("ConfigServer");
        const FuncDatabaseServer = container.resolve("DatabaseServer");
        const FuncImporterUtil = container.resolve("ImporterUtil");
        const staticRouterModService = container.resolve("StaticRouterModService");
        const traderConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        const ModPath = PreAkiModLoader.getModPath("火神重工-重启");
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`);
        const ClientDB = FuncDatabaseServer.getTables();
        const imageRouter = container.resolve("ImageRouter");
        const profileHelper = container.resolve("ProfileHelper");
        const JsonUtil = container.resolve("JsonUtil");
        Logger.logWithColor("[Console]: PreAkiLoadingAccess...", "yellow");
        container.afterResolution("BotGenerator", (_t, result) => {
            // We want to replace the original method logic with something different
            result.addDogtagToBot = (bot) => {
                return this.DogTagGenerator(bot);
            };
            // The modifier Always makes sure this replacement method is ALWAYS replaced
        }, { frequency: "Always" });
        //this.setupTraderUpdateTime(traderConfig);
        //this.registerProfileImage(PreAkiModLoader, imageRouter);
        //Traders[baseJson._id] = baseJson._id;
    }
    postDBLoad(container) {
        const Logger = container.resolve("WinstonLogger");
        const PreAkiModLoader = container.resolve("PreAkiModLoader");
        const FuncDatabaseServer = container.resolve("DatabaseServer");
        const FuncImporterUtil = container.resolve("ImporterUtil");
        const imageRouter = container.resolve("ImageRouter");
        const launcherCallbacks = container.resolve("LauncherCallbacks");
        const configServer = container.resolve("ConfigServer");
        const VFS = container.resolve("VFS");
        const JsonUtil = container.resolve("JsonUtil");
        const common = container.resolve("VulcanCommon");
        //const itemEditor = container.resolve<VulcanItemEditor>("VulcanItemEditor")
        //const localeHelper = container.resolve<VulcanLocaleHelper>("VulcanLocaleHelper")
        //const handbookHelper = container.resolve<VulcanHandBookHelper>("VulcanHandBookHelper")
        //const questHelper = container.resolve<VulcanQuestHelper>("VulcanQuestHelper")
        //const traderHelper = container.resolve<VulcanTraderHelper>("VulcanTraderHelper")
        //const dbHelper = container.resolve<VulcanDatabaseHelper>("VulcanDatabaseHelper")
        const ClientDB = FuncDatabaseServer.getTables();
        const ClientQuest = ClientDB.templates.quests;
        const ClientItem = ClientDB.templates.items;
        const ClientHideout = ClientDB.hideout.areas;
        const ModPath = PreAkiModLoader.getModPath("火神重工-重启");
        const imageFilepath = `./${ModPath}db/avatar/`;
        const iconPath = `${ModPath}images/quests/`;
        const iconList = VFS.getFiles(iconPath);
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`);
        const Recipe = FuncImporterUtil.loadRecursive(`${ModPath}Recipe/`);
        const Hideout = FuncImporterUtil.loadRecursive(`${ModPath}Hideout/`);
        const ServerVersion = launcherCallbacks.getServerVersion();
        //const SVCheck = versionFormatCheck(ServerVersion)
        const ReshalaChance = 40;
        const Config = JsonUtil.deserialize(VFS.readFile(`${ModPath}config.json`));
        const BotScav = ClientDB.bots.types.assault;
        const BotReshala = ClientDB.bots.types.bossbully;
        const BotSanitar = ClientDB.bots.types.bosssanitar;
        const BotKnight = ClientDB.bots.types.bossknight;
        const BotGlukhar = ClientDB.bots.types.bossgluhar;
        const BotShturman = ClientDB.bots.types.bosskojaniy;
        const BotKilla = ClientDB.bots.types.bosskilla;
        const BotTagilla = ClientDB.bots.types.bosstagilla;
        const BotBigPipe = ClientDB.bots.types.followerbigpipe;
        const BotBirdEye = ClientDB.bots.types.followerbirdeye;
        const GrenadeTrigger = { "Trigger": false };
        const Pack = JsonUtil.deserialize(VFS.readFile(`${ModPath}package.json`));
        const version = Pack.version;
        const ModName = Pack.name;
        const TraderMap = DB.templates.Map.TraderAssort.TraderMap;
        const QuestMap = DB.templates.Map.QuestMap;
        const ItemMap = DB.templates.Map.ItemMap;
        const AllItems = ClientDB.templates.items;
        Logger.logWithColor("[Console]: PostDataBaseLoadingAccess...", "yellow");
        common.Log("心智云图已连接，正在加载数据……");
        common.waitForTime(2);
        common.Log("正在初始化商人……");
        common.waitForTime(2);
        common.initTrader(DB.traders.Persicaria, imageFilepath, 0.1, 90, 3600);
        common.Log("正在执行原版物品修改……");
        common.waitForTime(2);
        ClientItem["5b6d9ce188a4501afc1b2b25"]._props.Grids[0]._props.cellsV = 14;
        ClientItem["5b6d9ce188a4501afc1b2b25"]._props.Grids[0]._props.cellsH = 14;
        this.initWepons(container);
        this.initKeyEdit(container);
        common.Log("正在生成Boss……");
        common.waitForTime(2);
        common.excludeLoot(DB.templates.items);
        common.excludeAirDrop(DB.templates.airdropblacklist);
        this.initBotEdit(container);
        common.Log("正在加载藏身处……");
        common.waitForTime(2);
        this.initHideout(container);
        common.Log("正在初始化任务……");
        common.waitForTime(2);
        initQuest();
        common.Log("正在反序列化任务数据……");
        common.waitForTime(2);
        common.initQuestCond(DB.templates.QuestData.Vulcan.QuestConditions);
        common.loadRewardData(DB.templates.QuestData.Vulcan.QuestRewards);
        common.Log("正在反序列化商人数据……");
        common.waitForTime(2);
        common.initAssortData(DB.templates.TraderData.Vulcan.Persicaria.AssortData);
        common.indexQuestReward();
        VFS.writeFile(`${ModPath}questExport.json`, JSON.stringify(ClientDB.templates.quests, null, 4));
        //物品写入
        common.Log("正在加载物品数据……");
        common.waitForTime(2);
        initItems();
        initArmBand();
        common.Log("正在加载本地化文本……");
        common.waitForTime(2);
        initLocales();
        common.Log("正在加载自定义服装……");
        common.waitForTime(2);
        initSuits();
        //dbHelper.loadItem(DB.templates.items)
        common.Log("正在修复容器类型……");
        common.waitForTime(2);
        const 公文包 = ClientDB.templates.items["外勤公文包"]._props.Grids[0]._props.filters[0].Filter;
        //公文包容纳类型修复
        common.addItemWithRagfairTagBySize("5b47574386f77428ca22b2f1", 公文包, 1); //贵重物品
        common.addItemWithRagfairTagBySize("5b47574386f77428ca22b337", 公文包, 1); //药丸
        common.addItemWithRagfairTag("5b47574386f77428ca22b33a", 公文包); //注射器
        common.addItemWithRagfairTagBySize("5b47574386f77428ca22b33b", 公文包, 1); //子弹
        common.addItemWithRagfairTag("5b47574386f77428ca22b341", 公文包); //情报物品
        common.addItemWithRagfairTagBySize("5b47574386f77428ca22b345", 公文包, 1); //特殊装备
        common.addItemWithRagfairTag("5b5f78b786f77447ed5636af", 公文包); //钱 
        common.addItemWithRagfairTag("5c518ec986f7743b68682ce2", 公文包); //机械钥匙
        common.addItemWithRagfairTag("5c518ed586f774119a772aee", 公文包); //电子钥匙
        common.addItemWithRagfairTagBySize("5b47574386f77428ca22b339", 公文包, 1); //创伤治疗
        common.addItemWithRagfairTagBySize("5b47574386f77428ca22b336", 公文包, 1); //食品
        common.addItemWithRagfairTagBySize("5b47574386f77428ca22b335", 公文包, 1); //饮品
        公文包.push("59f32bb586f774757e1e8442"); //Bear狗牌
        公文包.push("59f32c3b86f77472a31742f0"); //Usec狗牌
        公文包.push("阿萨兰之爪"); //阿萨兰之爪
        公文包.push("5bc9c049d4351e44f824d360"); //古董书
        公文包.push("5c0fa877d174af02a012e1cf"); //滤嘴水壶 
        公文包.push("59fafd4b86f7745ca07e1232"); //钥匙收纳器
        公文包.push("62a09d3bcf4a99369e262447"); //钥匙扣
        公文包.push("5783c43d2459774bbe137486"); //钱包
        公文包.push("60b0f6c058e0b0481a09ad11"); //WZ钱包
        公文包.push("619cbf9e0a7c3a1a2731940a"); //钥匙卡收纳盒
        common.fixEuqipment("外勤公文包", "5d235bb686f77443f4331278");
        common.fixEuqipment("黑四眼", "5c0558060db834001b735271");
        common.fixEuqipment("Boss狗牌", "59f32bb586f774757e1e8442");
        common.fixEuqipment("Scav狗牌", "59f32bb586f774757e1e8442");
        common.fixEuqipment("邪教徒狗牌", "59f32bb586f774757e1e8442");
        //任务图片添加
        for (const icon of iconList) {
            const filename = VFS.stripExtension(icon);
            imageRouter.addRoute(`/files/quest/icon/${filename}`, `${iconPath}${icon}`);
        }
        //Customcommon.Log("正在加载配方数据...");
        for (let recipe in Recipe) {
            //ClientDB.hideout.production.push(Recipe[recipe].Data);
            //Customcommon.Log("配方数据加载成功: " + Recipe[recipe].Name);
        }
        //Buff写入
        for (let buff in DB.globals) {
            ClientDB.globals.config.Health.Effects.Stimulator.Buffs[buff] = DB.globals[buff];
        }
        common.Log("正在生成战利品……");
        this.initLoot(container);
        common.waitForTime(2);
        //Bot Modifier
        //Bot战利品生成
        common.addLoot("高浓缩咖啡方糖", BotScav.inventory.items.Backpack, 25);
        common.addLoot("高浓缩咖啡方糖", BotScav.inventory.items.Pockets, 25);
        common.addLoot("高浓缩咖啡方糖", BotScav.inventory.items.TacticalVest, 25);
        common.addLoot("Vulcan高能量蛋白棒", BotScav.inventory.items.Backpack, 15);
        common.addLoot("Vulcan高能量蛋白棒", BotScav.inventory.items.Pockets, 15);
        common.addLoot("Vulcan高能量蛋白棒", BotScav.inventory.items.TacticalVest, 15);
        common.addLoot("Vulcan便携能量饮料包", BotScav.inventory.items.Backpack, 15);
        common.addLoot("Vulcan便携能量饮料包", BotScav.inventory.items.Pockets, 15);
        common.addLoot("Vulcan便携能量饮料包", BotScav.inventory.items.TacticalVest, 15);
        common.addLoot("Vulcan活力因子激活血清", BotSanitar.inventory.items.Pockets, 15);
        common.addLoot("Vulcan活力因子激活血清", BotKnight.inventory.items.Pockets, 15);
        common.addLoot("Vulcan活力因子激活血清", BotBigPipe.inventory.items.Pockets, 15);
        common.addLoot("Vulcan活力因子激活血清", BotBirdEye.inventory.items.Pockets, 15);
        common.addLoot("Vulcan活力因子激活血清", BotGlukhar.inventory.items.Pockets, 15);
        common.addLoot("Vulcan活力因子激活血清", BotShturman.inventory.items.Pockets, 15);
        common.addLoot("Vulcan活力因子激活血清", BotTagilla.inventory.items.Pockets, 15);
        common.addLoot("Vulcan活力因子激活血清", BotKilla.inventory.items.Pockets, 15);
        //AddLoot("Vulcan活力因子激活血清", BotReshala.inventory.items.Pockets, 15)
        common.addLoot("Vulcan实验型再生促进血清", BotSanitar.inventory.items.Pockets, 15);
        common.addLoot("Vulcan实验型再生促进血清", BotKnight.inventory.items.Pockets, 15);
        common.addLoot("Vulcan实验型再生促进血清", BotBigPipe.inventory.items.Pockets, 15);
        common.addLoot("Vulcan实验型再生促进血清", BotBirdEye.inventory.items.Pockets, 15);
        common.addLoot("Vulcan实验型再生促进血清", BotGlukhar.inventory.items.Pockets, 15);
        common.addLoot("Vulcan实验型再生促进血清", BotShturman.inventory.items.Pockets, 15);
        common.addLoot("Vulcan实验型再生促进血清", BotTagilla.inventory.items.Pockets, 15);
        common.addLoot("Vulcan实验型再生促进血清", BotKilla.inventory.items.Pockets, 15);
        //容器战利品(仍需验证)(已经生效)
        common.addStaticLoot("高浓缩咖啡方糖", "59e3577886f774176a362503");
        common.addStaticLoot("Vulcan实验型再生促进血清", "544fb3f34bdc2d03748b456a");
        common.addStaticLoot("Vulcan细胞活性刺激血清", "5c0e531d86f7747fa23f4d42");
        common.addStaticLoot("Vulcan战场紧急手术套组", "5d02778e86f774203e7dedbe");
        common.addStaticLoot("Vulcan便携能量饮料包", "60098b1705871270cd5352a1");
        common.addStaticLoot("Vulcan高能量蛋白棒", "544fb6cc4bdc2d34748b456e");
        common.addMapLoot("白火药", "590c5a7286f7747884343aea");
        common.addStaticLoot("白火药", "590c5a7286f7747884343aea");
        common.addMapLoot("薇尔莉特火药", "5d6fc78386f77449d825f9dc");
        common.addStaticLoot("薇尔莉特火药", "5d6fc78386f77449d825f9dc");
        common.addMapLoot("布洛妮娅火药", "5d6fc87386f77449db3db94e");
        common.addStaticLoot("布洛妮娅火药", "5d6fc87386f77449db3db94e");
        common.addStaticLoot("城管臂带", "60b0f988c4449e4cb624c1da");
        common.addStaticLoot("WanderingEarth臂带", "60b0f988c4449e4cb624c1da");
        common.addStaticLoot("Trans臂带", "60b0f988c4449e4cb624c1da");
        common.addStaticLoot("昭烈帝臂带", "60b0f988c4449e4cb624c1da");
        common.addMapLoot("不死图腾", "59faff1d86f7746c51718c9c");
        common.addStaticLoot("不死图腾", "59faff1d86f7746c51718c9c");
        common.addMapLoot("朱雀", "63a0b208f444d32d6f03ea1e");
        common.addStaticLoot("朱雀", "63a0b208f444d32d6f03ea1e");
        common.addMapLoot("阿萨兰之爪", "5bc9c049d4351e44f824d360");
        common.addStaticLoot("阿萨兰之爪", "5bc9c049d4351e44f824d360");
        common.addMapLoot("MC钻石", "5c1267ee86f77416ec610f72");
        common.addStaticLoot("MC钻石", "5c1267ee86f77416ec610f72");
        common.addMapLoot("荧石粉", "590a3cd386f77436f20848cb");
        common.addStaticLoot("荧石粉", "590a3cd386f77436f20848cb");
        common.addMapLoot("火药", "590c5a7286f7747884343aea");
        common.addStaticLoot("火药", "590c5a7286f7747884343aea");
        common.addMapLoot("红石粉", "590a3b0486f7743954552bdb");
        common.addStaticLoot("红石粉", "590a3b0486f7743954552bdb");
        common.addMapLoot("青金石", "590a391c86f774385a33c404");
        common.addStaticLoot("青金石", "590a391c86f774385a33c404");
        //普通报价单处理
        //common.addAssort("Persicaria", "Beta臂带", 1, 1)
        //common.addAssort("Persicaria", "昭烈帝臂带", 1, 1)
        //common.addAssort("Persicaria", "支持者纪念币_葬爱", 1, 1)
        common.addAssort("Persicaria", "妖精女仆长的臂带", 20011113, 4);
        common.addAssort("5ac3b934156ae10c4430e83c", "小腰包", 1476, 1);
        //自定义控制台输出
        common.Log("所有数据加载完毕，欢迎回来，指挥官。");
        common.waitForTime(2);
        function CustomLog(string) {
            Logger.logWithColor("[Console]: " + string, "yellow");
        }
        function Log(string) {
            Logger.logWithColor("[Console]: " + string, "cyan");
        }
        function CustomAccess(string) {
            Logger.logWithColor("[Console]: " + string, "green");
        }
        function CustomDenied(string) {
            Logger.logWithColor("[Console]: " + string, "red");
        }
        function AddStaticLoot(id, target) {
            for (let loot in ClientDB.loot.staticLoot) {
                var LootArr = ClientDB.loot.staticLoot[loot].itemDistribution;
                for (var i = 0; i < LootArr.length; i++) {
                    if (LootArr[i].tpl == target) {
                        LootArr.push({
                            "tpl": id,
                            "relativeProbability": LootArr[i].relativeProbability
                        });
                        break;
                    }
                }
            }
        }
        function AddMapLoot(id, target) {
            for (let map in ClientDB.locations) {
                if (ClientDB.locations[map].looseLoot) {
                    for (var i = 0; i < ClientDB.locations[map].looseLoot.spawnpoints.length; i++) {
                        for (var j = 0; j < ClientDB.locations[map].looseLoot.spawnpoints[i].template.Items.length; j++) {
                            if (ClientDB.locations[map].looseLoot.spawnpoints[i].template.Items[j]._tpl == target) {
                                var ID = GenerateHash(id);
                                var relative = ClientDB.locations[map].looseLoot.spawnpoints[i].itemDistribution.find(item => item.composedKey.key == ClientDB.locations[map].looseLoot.spawnpoints[i].template.Items[j]._id).relativeProbability;
                                //CustomAccess(relative)
                                ClientDB.locations[map].looseLoot.spawnpoints[i].template.Items.push({
                                    "_id": ID,
                                    "_tpl": id
                                });
                                ClientDB.locations[map].looseLoot.spawnpoints[i].itemDistribution.push({
                                    "composedKey": {
                                        "key": ID
                                    },
                                    "relativeProbability": relative
                                });
                            }
                        }
                    }
                }
            }
        }
        function AddLoot(id, local, num) {
            local[id] = num;
        }
        function initItems() {
            for (let item in DB.templates.items) {
                var Local = ClientDB.locales.global["ch"];
                var ItemData = DB.templates.items[item];
                if (ItemData._id.includes("纪念币")) {
                    common.fixEuqipment(ItemData._id, "59faff1d86f7746c51718c9c");
                    //common.Log("荣誉架修复成功")
                }
                if (ItemData._id.includes("支持纪念币")) {
                    common.addMapLoot(ItemData._id, "59faff1d86f7746c51718c9c");
                    common.addStaticLoot(ItemData._id, "59faff1d86f7746c51718c9c");
                    //common.Log("荣誉架修复成功")
                }
                if (ItemData._id.includes("开拓纪念币")) {
                    common.addMapLoot(ItemData._id, "59faff1d86f7746c51718c9c");
                    common.addStaticLoot(ItemData._id, "59faff1d86f7746c51718c9c");
                    //common.Log("荣誉架修复成功")
                }
                ClientDB.templates.items[item] = DB.templates.items[item];
                Local[ItemData._id + " Name"] = ItemData._props.Name;
                Local[ItemData._id + " ShortName"] = ItemData._props.ShortName;
                Local[ItemData._id + " Description"] = ItemData._props.Description;
                ClientDB.templates.handbook.Items.push({
                    "Id": ItemData._id,
                    "ParentId": ItemData._props.RagfairType,
                    "Price": ItemData._props.DefaultPrice
                });
                if (Config.Debug) {
                    common.Log("物品数据加载成功: " + ItemData._props.Name);
                }
            }
        }
        function initArmBand() {
            for (let i in ClientDB.templates.profiles) {
                ClientDB.templates.profiles[i].bear.character.Inventory.items.push({
                    _id: common.generateHash(`${i}_bear_Beta`),
                    _tpl: "Beta臂带",
                    parentId: ClientDB.templates.profiles[i].bear.character.Inventory.equipment,
                    slotId: "ArmBand"
                });
                ClientDB.templates.profiles[i].usec.character.Inventory.items.push({
                    _id: common.generateHash(`${i}_usec_Beta`),
                    _tpl: "Beta臂带",
                    parentId: ClientDB.templates.profiles[i].usec.character.Inventory.equipment,
                    slotId: "ArmBand"
                });
            }
        }
        function waitForTime(time) {
            var random = Math.ceil(Math.random() * time) * 1000;
            var dat = performance.now();
            for (var i = 0; i < 10; i++) {
                i = 0;
                if (performance.now() - dat >= random) {
                    break;
                }
            }
        }
        //装备修复
        function FixEuqipment(id, target) {
            for (let item in ClientDB.templates.items) {
                if (ClientDB.templates.items[item]._props.Slots) {
                    for (let slot in ClientDB.templates.items[item]._props.Slots) {
                        for (let filter in ClientDB.templates.items[item]._props.Slots[slot]._props.filters[0].Filter) {
                            if (ClientDB.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] == target) {
                                ClientDB.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push(id);
                            }
                        }
                    }
                }
                if (ClientDB.templates.items[item]._props.Grids) {
                    for (var i = 0; i < ClientDB.templates.items[item]._props.Grids.length; i++) {
                        for (var j = 0; j < ClientDB.templates.items[item]._props.Grids[i]._props.filters.length; j++) {
                            for (var k = 0; k < ClientDB.templates.items[item]._props.Grids[i]._props.filters[j].Filter.length; k++) {
                                if (ClientDB.templates.items[item]._props.Grids[i]._props.filters[j].Filter[k] == target) {
                                    ClientDB.templates.items[item]._props.Grids[i]._props.filters[j].Filter.push(id);
                                }
                            }
                        }
                    }
                }
                if (ClientDB.templates.items[item]._props.Cartridges) {
                    for (var i = 0; i < ClientDB.templates.items[item]._props.Cartridges.length; i++) {
                        for (var j = 0; j < ClientDB.templates.items[item]._props.Cartridges[i]._props.filters.length; j++) {
                            for (var k = 0; k < ClientDB.templates.items[item]._props.Cartridges[i]._props.filters[j].Filter.length; k++) {
                                if (ClientDB.templates.items[item]._props.Cartridges[i]._props.filters[j].Filter[k] == target) {
                                    ClientDB.templates.items[item]._props.Cartridges[i]._props.filters[j].Filter.push(id);
                                }
                            }
                        }
                    }
                }
                if (ClientDB.templates.items[item]._props.Chambers) {
                    for (var i = 0; i < ClientDB.templates.items[item]._props.Chambers.length; i++) {
                        for (var j = 0; j < ClientDB.templates.items[item]._props.Chambers[i]._props.filters.length; j++) {
                            for (var k = 0; k < ClientDB.templates.items[item]._props.Chambers[i]._props.filters[j].Filter.length; k++) {
                                if (ClientDB.templates.items[item]._props.Chambers[i]._props.filters[j].Filter[k] == target) {
                                    ClientDB.templates.items[item]._props.Chambers[i]._props.filters[j].Filter.push(id);
                                }
                            }
                        }
                    }
                }
            }
        }
        //使用跳蚤市场标签处理容器物品
        function AddItemWithRagfairTag(Tag, Filter) {
            for (var i = 0; i < ClientDB.templates.handbook.Items.length; i++) {
                var ItemData = ClientDB.templates.handbook.Items[i];
                if (ItemData.ParentId == Tag) {
                    if (ClientItem[ItemData.Id]._props.Width * ClientItem[ItemData.Id]._props.Height <= 1) {
                        Filter.push(ItemData.Id);
                    }
                }
            }
        }
        function GenerateHash(string) {
            const shasum = crypto_1.default.createHash("sha1");
            shasum.update(string);
            return shasum.digest("hex").substring(0, 24);
        }
        function AddAssort(trader, id, price, ll) {
            var AssortData1 = ClientDB.traders[trader].assort;
            var CacheHashID = GenerateHash(id);
            AssortData1.items.push({
                "_id": CacheHashID,
                "_tpl": id,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "StackObjectsCount": 99999,
                    "UnlimitedCount": true
                }
            });
            AssortData1.barter_scheme[CacheHashID] = [[{
                        count: price,
                        _tpl: '5449016a4bdc2d6f028b456f'
                    }]];
            AssortData1.loyal_level_items[CacheHashID] = ll;
        }
        function addQuestReward(questid, reward) {
            if (ClientQuest[questid] != null) {
                const Quest = ClientQuest[questid];
                const Reward = Quest.rewards.Success;
                var RewardCache = reward;
                RewardCache.index = Reward.length;
                Reward.push(reward);
            }
        }
        function copyObj(item) {
            if (typeof item !== 'object' || item === null) {
                return item; // 如果不是对象或者是 null，直接返回
            }
            let copy = Array.isArray(item) ? [] : {};
            for (let key in item) {
                if (Object.prototype.hasOwnProperty.call(item, key)) {
                    copy[key] = copyObj(item[key]); // 递归复制子成员
                }
            }
            return copy;
        }
        function createQuest(questid, traderid, type, imagepath, location) {
            const db = ClientDB;
            const quest = db.templates.quests["5967733e86f774602332fc84"];
            var newquest = copyObj(quest);
            newquest.type = type;
            newquest.conditions.AvailableForFinish = [];
            newquest.conditions.AvailableForStart = [];
            newquest.rewards.Success = [];
            newquest.acceptPlayerMessage = `${questid} acceptPlayerMessage`;
            newquest.changeQuestMessageText = `${questid} changeQuestMessageText`;
            newquest.completePlayerMessage = `${questid} completePlayerMessage`;
            newquest.description = `${questid} description`;
            newquest.failMessageText = `${questid} failMessageText`;
            newquest.name = `${questid} name`;
            newquest.note = `${questid} note`;
            newquest.startedMessageText = `${questid} startedMessageText`;
            newquest.successMessageText = `${questid} successMessageText`;
            newquest.templateId = questid;
            newquest._id = questid;
            newquest.image = imagepath;
            newquest.traderId = traderid;
            newquest.location = location;
            db.templates.quests[questid] = newquest;
            //return newquest
        }
        function loadRewardData(RW) {
            for (var r = 0; r < RW.length; r++) {
                const RW2 = RW[r];
                const QuestID = getQuestID(RW2.Quest);
                const QuestsData = ClientDB.templates.quests[QuestID];
                const Name = RW2.Name;
                switch (RW2.Condition) {
                    case "Finish":
                        {
                            const Reward = QuestsData.rewards.Success;
                            switch (RW2.Type) {
                                case "Item":
                                    {
                                        const Item = convertAssortArr(RW2.Items);
                                        var WeaponReward = convertWeaponAssortToReward(Item);
                                        Reward.push({
                                            "findInRaid": true,
                                            "id": `${Name}RW`,
                                            "type": "Item",
                                            "index": Reward.length,
                                            "target": `${WeaponReward[0]._id}`,
                                            "items": WeaponReward,
                                            "value": RW2.Count.toString()
                                        });
                                    }
                                    break;
                                case "Assort":
                                    {
                                        const RW2 = RW[r];
                                        const Item = convertAssortArr(RW2.Items);
                                        const ID = Item[0]._id;
                                        const AssortData = ClientDB.traders[TraderMap[RW2.Trader]].assort;
                                        const TraderData = ClientDB.traders[TraderMap[RW2.Trader]];
                                        for (var i = 0; i < Item.length; i++) {
                                            AssortData.items.push(Item[i]);
                                        }
                                        AssortData.barter_scheme[ID] = [[]];
                                        for (let br in RW2.Barter) {
                                            AssortData.barter_scheme[ID][0].push({
                                                "count": RW2.Barter[br],
                                                "_tpl": getItemID(br)
                                            });
                                        }
                                        AssortData.loyal_level_items[ID] = RW2.LLR;
                                        if (RW2.isLock == true) {
                                            TraderData.questassort.success[ID] = QuestID;
                                            if (RW2.isWeapon == true) {
                                                var WeaponReward = convertWeaponAssortToReward(Item);
                                                Reward.push({
                                                    "id": `${Name}RW`,
                                                    "type": "AssortmentUnlock",
                                                    "index": Reward.length,
                                                    "target": `${WeaponReward[0]._id}`,
                                                    "items": WeaponReward,
                                                    "loyaltyLevel": RW2.LLR,
                                                    "traderId": TraderMap[RW2.Trader]
                                                });
                                            }
                                            else {
                                                Reward.push({
                                                    "id": `${Name}RW`,
                                                    "type": "AssortmentUnlock",
                                                    "index": Reward.length,
                                                    "target": `${Name}RW1`,
                                                    "items": [
                                                        {
                                                            "_id": `${Name}RW1`,
                                                            "_tpl": Item[0]._tpl
                                                        }
                                                    ],
                                                    "loyaltyLevel": RW2.LLR,
                                                    "traderId": TraderMap[RW2.Trader]
                                                });
                                            }
                                        }
                                    }
                                    break;
                                case "Exp":
                                    {
                                        Reward.push({
                                            "id": `${Name}RW`,
                                            "index": Reward.length,
                                            "type": "Experience",
                                            "value": RW2.Count
                                        });
                                    }
                                    break;
                                case "Trust":
                                    {
                                        Reward.push({
                                            "id": `${Name}RW`,
                                            "index": Reward.length,
                                            "type": "TraderStanding",
                                            "target": TraderMap[RW2.TraderID],
                                            "value": RW2.Count
                                        });
                                    }
                                    break;
                            }
                        }
                        break;
                }
                QuestsData.rewards.Success = indexArray(QuestsData.rewards.Success);
                //CustomLog(`任务奖励处理完成: ${Name}`)
            }
        }
        function initLocales() {
            //邮箱本地化文本处理
            for (let mails in DB.locales["ch"].mail) {
                ClientDB.locales.global["ch"][mails] = DB.locales["ch"].mail[mails];
            }
            //任务本地化文本支持
            //Customcommon.Log("正在加载任务数据...")
            for (let quests in DB.locales["ch"].quest) {
                ClientDB.locales.global["ch"][quests + " name"] = DB.locales["ch"].quest[quests].name;
                ClientDB.locales.global["ch"][quests + " description"] = DB.locales["ch"].mail[DB.locales["ch"].quest[quests].startedMessageText];
                ClientDB.locales.global["ch"][quests + " failMessageText"] = DB.locales["ch"].mail[DB.locales["ch"].quest[quests].failMessageText];
                ClientDB.locales.global["ch"][quests + " successMessageText"] = DB.locales["ch"].mail[DB.locales["ch"].quest[quests].successMessageText];
                ClientDB.locales.global["ch"][quests + " startedMessageText"] = DB.locales["ch"].mail[DB.locales["ch"].quest[quests].startedMessageText];
                for (let cd in DB.locales["ch"].quest[quests].conditions) {
                    ClientDB.locales.global["ch"][cd] = DB.locales["ch"].quest[quests].conditions[cd];
                }
                //ClientDB.locales.global["en"].quest[quests] = DB.locales["ch"].quest[quests]
                //ClientDB.locales.global["ru"].quest[quests] = DB.locales["ch"].quest[quests]
                if (Config.Debug) {
                    Customcommon.Log("任务数据加载成功: " + DB.locales["ch"].quest[quests].name);
                }
            }
        }
        function initQuest() {
            for (let quest in DB.templates.QuestData.Vulcan.initQuest) {
                var Q = DB.templates.QuestData.Vulcan.initQuest[quest];
                createQuest(Q.ID, Q.TraderID, Q.Type, Q.imagepath, Q.Location);
                //ClientDB.templates.quests[quest] = DB.templates.quests[quest]
            }
        }
        function convertQuest(obj) {
            if (typeof obj !== 'object' || obj === null) {
                return obj;
            }
            let copy = Array.isArray(obj) ? [] : {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    if (key === '_props') {
                        Object.assign(copy, obj[key]);
                    }
                    else {
                        copy[key] = convertQuest(obj[key]);
                    }
                }
            }
            return copy;
        }
        function questFileFix(obj) {
            for (let a in obj) {
                const A = obj[a].conditions.AvailableForStart;
                const B = obj[a].conditions.AvailableForFinish;
                const C = obj[a].conditions.Fail;
                if (B.length > 0) {
                    for (var b = 0; b < B.length; b++) {
                        B[b].isEncoded = false;
                        B[b].countInRaid = false;
                        B[b].globalQuestCounterId = "";
                    }
                }
                if (A.length > 0) {
                    for (var b = 0; b < A.length; b++) {
                        A[b].globalQuestCounterId = "";
                    }
                }
                if (C.length > 0) {
                    for (var b = 0; b < C.length; b++) {
                        C[b].globalQuestCounterId = "";
                    }
                }
                obj[a].conditions.AvailableForFinish = convertQuest(obj[a].conditions.AvailableForFinish);
                obj[a].conditions.AvailableForStart = convertQuest(obj[a].conditions.AvailableForStart);
                obj[a].conditions.Fail = convertQuest(obj[a].conditions.Fail);
            }
            return obj;
        }
        function questCondFix(obj) {
            for (var i = 0; i < obj.length; i++) {
                const B = obj[i];
                B.isEncoded = false;
                B.countInRaid = false;
                B.globalQuestCounterId = "";
                obj[i] = convertQuest(obj[i]);
            }
            return obj;
        }
        function initSuits() {
            //服装生成
            //Customcommon.Log("正在加载服装数据...")
            for (let ct in DB.templates.custom) {
                var Local = ClientDB.locales.global["ch"];
                ClientDB.templates.customization[ct] = DB.templates.custom[ct];
                Local[ClientDB.templates.customization[ct]._id + " Name"] = ClientDB.templates.customization[ct]._props.Name;
                Local[ClientDB.templates.customization[ct]._id + " ShortName"] = ClientDB.templates.customization[ct]._props.ShortName;
                Local[ClientDB.templates.customization[ct]._id + " Description"] = ClientDB.templates.customization[ct]._props.Description;
                if (Config.Debug) {
                    common.Log("服装数据加载成功: " + Local[ClientDB.templates.customization[ct]._id + " Name"]);
                }
            }
        }
        //任务奖励重排序
        function indexArray(arr) {
            var Exp = [];
            var Item = [];
            var Recipe = [];
            var Assort = [];
            var Skill = [];
            var Llr = [];
            var Trader = [];
            var Reward = [];
            var index = 0;
            for (var i = 0; i < arr.length; i++) {
                switch (arr[i].type) {
                    case "Experience":
                        Exp.push(deepCopy(arr[i]));
                        break;
                    case "Item":
                        Item.push(deepCopy(arr[i]));
                        break;
                    case "ProductionScheme":
                        Recipe.push(deepCopy(arr[i]));
                        break;
                    case "AssortmentUnlock":
                        Assort.push(deepCopy(arr[i]));
                        break;
                    case "Skill":
                        Skill.push(deepCopy(arr[i]));
                        break;
                    case "TraderUnlock":
                        Trader.push(deepCopy(arr[i]));
                        break;
                    case "TraderStanding":
                        Llr.push(deepCopy(arr[i]));
                        break;
                }
            }
            for (var i = 0; i < Exp.length; i++) {
                Exp[i].index = index;
                Reward.push(Exp[i]);
                Reward[i].index = index;
                index++;
            }
            for (var i = 0; i < Item.length; i++) {
                Item[i].index = index;
                Reward.push(Item[i]);
                index++;
            }
            for (var i = 0; i < Recipe.length; i++) {
                Recipe[i].index = index;
                Reward.push(Recipe[i]);
                index++;
            }
            for (var i = 0; i < Assort.length; i++) {
                Assort[i].index = index;
                Reward.push(Assort[i]);
                index++;
            }
            for (var i = 0; i < Skill.length; i++) {
                Skill[i].index = index;
                Reward.push(Skill[i]);
                index++;
            }
            for (var i = 0; i < Trader.length; i++) {
                Trader[i].index = index;
                Reward.push(Trader[i]);
                index++;
            }
            for (var i = 0; i < Llr.length; i++) {
                Llr[i].index = index;
                Reward.push(Llr[i]);
                index++;
            }
            return Reward;
        }
        //深复制
        function deepCopy(obj) {
            if (typeof obj !== 'object' || obj === null) {
                return obj;
            }
            var copy = Array.isArray(obj) ? [] : {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    copy[key] = deepCopy(obj[key]);
                }
            }
            return copy;
        }
        //IDget
        function getQuestID(id) {
            if (QuestMap[id]) {
                return QuestMap[id];
            }
            return id;
        }
        function getItemID(id) {
            if (ItemMap[id]) {
                return ItemMap[id];
            }
            return id;
        }
        //传入物品数组转码
        function convertWeaponAssortToReward(arr) {
            var Array = [];
            Array.push({
                "_id": arr[0]._id,
                "_tpl": arr[0]._tpl,
                "upd": {
                    "FireMode": {
                        "FireMode": "single"
                    },
                    "StackObjectsCount": arr[0].upd.StackObjectsCount
                }
            });
            if (arr.length > 1) {
                for (var i = 1; i < arr.length; i++) {
                    Array.push({
                        "_id": arr[i]._id,
                        "_tpl": arr[i]._tpl,
                        "parentId": arr[i].parentId,
                        "slotId": arr[i].slotId
                    });
                }
            }
            return Array;
        }
        function convertAssortArr(arr) {
            var Array = [];
            for (var i = 0; i < arr.length; i++) {
                Array.push(arr[i]);
            }
            for (var i = 0; i < Array.length; i++) {
                if (ItemMap[Array[i]._tpl]) {
                    Array[i]._tpl = ItemMap[Array[i]._tpl];
                }
            }
            return Array;
        }
        function initAssortData(Assort) {
            for (var i = 0; i < Assort.length; i++) {
                const RW2 = Assort[i];
                const ASID = RW2.ID;
                const TraderData = ClientDB.traders[RW2.Trader];
                const Item = convertAssortArr(RW2.Item);
                //const Item = RW2.Item
                const ID = Item[0]._id;
                const AssortData = ClientDB.traders[RW2.Trader].assort;
                for (var j = 0; j < Item.length; j++) {
                    AssortData.items.push(Item[j]);
                }
                AssortData.barter_scheme[ASID] = [[]];
                for (let br in RW2.Barter) {
                    AssortData.barter_scheme[ASID][0].push({
                        "count": RW2.Barter[br],
                        "_tpl": getItemID(br)
                    });
                }
                AssortData.loyal_level_items[ASID] = RW2.TrustLevel;
                if (RW2.Locked == true) {
                    const QuestID = RW2.Quest;
                    const QuestsData = ClientDB.templates.quests[QuestID];
                    const Reward = QuestsData.rewards.Success;
                    TraderData.questassort.success[ID] = QuestID;
                    if (RW2.isWeapon == true) {
                        var WeaponReward = convertWeaponAssortToReward(Item);
                        Reward.push({
                            "id": `${ASID}RW`,
                            "type": "AssortmentUnlock",
                            "index": Reward.length,
                            "target": `${WeaponReward[0]._id}`,
                            "items": WeaponReward,
                            "loyaltyLevel": RW2.TrustLevel,
                            "traderId": TraderMap[RW2.Trader]
                        });
                    }
                    else {
                        Reward.push({
                            "id": `${ASID}RW`,
                            "type": "AssortmentUnlock",
                            "index": Reward.length,
                            "target": `${ASID}RW1`,
                            "items": [
                                {
                                    "_id": `${ASID}RW1`,
                                    "_tpl": Item[0]._tpl
                                }
                            ],
                            "loyaltyLevel": RW2.TrustLevel,
                            "traderId": TraderMap[RW2.Trader]
                        });
                    }
                }
            }
        }
        function indexQuestReward() {
            for (let q in ClientDB.templates.quests) {
                ClientDB.templates.quests[q].rewards.Success = indexArray(ClientDB.templates.quests[q].rewards.Success);
            }
        }
        //Customcommon.Log("开始执行任务文件转换"
        //var newcondi = questCondFix(DB.templates.QuestCondition["5c51aac186f77432ea65c552"].Conditions)
        var newquest = questFileFix(convertQuest(DB.quests));
        VFS.writeFile(`${ModPath}newquest.json`, JSON.stringify(newquest, null, 4));
        //VFS.writeFile(`${ModPath}newcondi.json`, JSON.stringify(newcondi, null, 4))
        //common.Log("任务文件转换完成！")
        //FixEuqipment("19C", "5cadf6eeae921500134b2799")
        //AddAssort("Polaris", "19C", 200000, 2)
        //FixEuqipment("龙息榴霰弹", "5ede475339ee016e8c534742")
        //AddAssort("Polaris", "龙息榴霰弹", 20000, 2)
        var QC = {};
        var QW = [];
        //数据序列化
        //任务数据序列化
        /*
        for (let quest in DB.templates.quests) {
            //ClientDB.templates.quests[quest] = DB.templates.quests[quest]
            var Q = DB.templates.quests[quest]
            QC[Q._id] = {}
            QC[Q._id].ID = Q._id
            QC[Q._id].Type = Q.type
            QC[Q._id].imagepath = Q.image
            QC[Q._id].TraderID = Q.traderId
            QC[Q._id].Location = Q.location
            for (var i = 0; i < Q.rewards.Success.length; i++) {
                var R = Q.rewards.Success[i]
                switch (R.type) {
                    case "Item": {
                        QW.push({
                            "Items": R.items,
                            "Quest": quest,
                            "Condition": "Finish",
                            "Type": "Item",
                            "Count": parseInt(R.value),
                            "Name": R.id,
                            "Desc": R.id
                        })
                    }
                        break;
                    case "Experience": {
                        QW.push({
                            "Trader": Q.traderId,
                            "Condition": "Finish",
                            "Type": "Exp",
                            "Quest": quest,
                            "Count": parseInt(R.value),
                            "Name": R.id,
                            "Desc": R.id
                        })
                    }
                        break;
                    case "TraderStanding": {
                        QW.push({
                            "Trader": Q.traderId,
                            "Condition": "Finish",
                            "Type": "Trust",
                            "Quest": quest,
                            "Count": parseFloat(R.value),
                            "TraderID": R.target,
                            "Name": R.id,
                            "Desc": R.id
                        })
                    }
                        break;
                        case "TraderStanding": {
                            QW.push({
                                "Trader": Q.traderId,
                                "Condition": "Finish",
                                "Type": "Trust",
                                "Quest": quest,
                                "Count": parseFloat(R.value),
                                "TraderID": R.target,
                                "Name": R.id,
                                "Desc": R.id
                            })
                        }
                            break;
                        case "Skill": {
                            QW.push({
                                "Trader": Q.traderId,
                                "Condition": "Finish",
                                "Type": "Skill",
                                "Quest": quest,
                                "Skill": R.target,
                                "Count": parseInt(R.value),
                                "TraderID": R.target,
                                "Name": R.id,
                                "Desc": R.id
                            })
                        }
                            break;
                }
            }
        }
        VFS.writeFile(`${ModPath}qwtest.json`, JSON.stringify(QW, null, 4))
        
        //商品数据序列化
        var AS = []
        for (var i = 0; i < DB.traders.Persicaria.assort.items.length; i++) {
            var A = DB.traders.Persicaria.assort.items[i]
            var id = A._id
            if (A.upd) {
                var Bt = DB.traders.Persicaria.assort.barter_scheme[id]
                var T = DB.traders.Persicaria.assort.loyal_level_items[id]
                var as = {
                    ID: id,
                    Trader: "Persicaria",
                    Item: [],
                    //Count: A.upd ? (A.upd.StackObjectsCount ? A.upd.StackObjectsCount : 999999) : -1
                    Barter: {},
                    TrustLevel: T,
                    Locked: false,
                    Quest: ""
                }
                as.Item.push(A)
                var j = i + 1;
                while (j < DB.traders.Persicaria.assort.items.length) {
                    var B = DB.traders.Persicaria.assort.items[j];
                    if (!B.upd) {
                        as.Item.push(B);
                        j++;
                    } else {
                        break;
                    }
                }
                for (var k = 0; k < Bt[0].length; k++) {
                    as.Barter[Bt[0][k]._tpl] = Bt[0][k].count
                }
                i = j - 1; // Update outer loop index to skip processed elements
                AS.push(as);
            }
        }
        for (var i = 0; i < AS.length; i++) {
            var qas = DB.traders.Persicaria.questassort.success
            if (qas[AS[i].ID]) {
                AS[i].Locked = true
                AS[i].Quest = qas[AS[i].ID]
            }
        }
        VFS.writeFile(`${ModPath}astest.json`, JSON.stringify(AS, null, 4))
        var QD = {}
        for (let quest in DB.templates.QuestData.Vulcan.QuestConditions) {
            var Q = DB.templates.QuestData.Vulcan.QuestConditions[quest]
            QD[quest] = {}
            QD[quest].Start = {}
            QD[quest].Finish = {}
            QD[quest].Fail = {}
            QD[quest].Start.Data = Q.Start
            QD[quest].Start.Override = false
            QD[quest].Finish.Data = Q.Finish
            QD[quest].Finish.Override = false
            QD[quest].Fail.Data = Q.Fail
            QD[quest].Fail.Override = false

        }
        //VFS.writeFile(`${ModPath}qdtest.json`, JSON.stringify(QC, null, 4))
        //VFS.writeFile(`${ModPath}qctest.json`, JSON.stringify(QD, null, 4))
        */
    }
    postAkiLoad(container) {
        const Logger = container.resolve("WinstonLogger");
        Logger.logWithColor("[Console]: PostAkiLoadingAccess...", "yellow");
        return;
    }
    //添加商人头像
    registerProfileImage(preAkiModLoader, imageRouter) {
        const imageFilepath = `./${preAkiModLoader.getModPath("火神重工-重启")}db/avatar`;
        //imageRouter.addRoute(baseJson.avatar.replace(".jpg", ""), `${imageFilepath}/Persicaria.jpg`);
        //imageRouter.addRoute(NSBase.avatar.replace(".png", ""), `${imageFilepath}/Polaris.png`)
    }
    //商人刷新时间
    setupTraderUpdateTime(traderConfig) {
        //const traderRefreshRecord: UpdateTime = { traderId: baseJson._id, seconds: 3600 }
        //const NSBasetraderRefreshRecord: UpdateTime = { traderId: NSBase._id, seconds: 3600 }
        //traderConfig.updateTime.push(traderRefreshRecord);
        //traderConfig.updateTime.push(NSBasetraderRefreshRecord);
    }
    initTrader(container, TraderObj, ModPath) {
        const Logger = container.resolve("WinstonLogger");
        const PreAkiModLoader = container.resolve("PreAkiModLoader");
        const FuncDatabaseServer = container.resolve("DatabaseServer");
        const FuncImporterUtil = container.resolve("ImporterUtil");
        const imageRouter = container.resolve("ImageRouter");
        const configServer = container.resolve("ConfigServer");
        const VFS = container.resolve("VFS");
        const traderConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        const JsonUtil = container.resolve("JsonUtil");
        const ClientDB = FuncDatabaseServer.getTables();
        const imageFilepath = `./${ModPath}db/avatar/`;
        const Assort = TraderObj.assort;
        const Base = TraderObj.base;
        const Log = TraderObj.Dialogue;
        const Qssort = TraderObj.questassort;
        const Suit = TraderObj.suits;
        const trader = Base._id;
        ClientDB.traders[trader] = TraderObj;
        var TraderBase = Base;
        var TraderID = trader;
        ClientDB.locales.global["ch"][TraderID + " FullName"] = TraderBase.surname;
        ClientDB.locales.global["ch"][TraderID + " FirstName"] = TraderBase.name;
        ClientDB.locales.global["ch"][TraderID + " Nickname"] = TraderBase.nickname;
        ClientDB.locales.global["ch"][TraderID + " Location"] = TraderBase.location;
        ClientDB.locales.global["ch"][TraderID + " Description"] = TraderBase.description;
        Traders_1.Traders[trader] = trader;
        const InsuranceConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.INSURANCE);
        InsuranceConfig.insuranceMultiplier[TraderID] = 0.1;
        InsuranceConfig.returnChancePercent[TraderID] = 90;
        //VFS.writeFile(`${ModPath}db/insurance.json`, JSON.stringify(InsuranceConfig, null, 4))
        const traderRefreshRecord = { traderId: trader, seconds: 3600 };
        traderConfig.updateTime.push(traderRefreshRecord);
        imageRouter.addRoute(baseJson.avatar.replace(".jpg", ""), `${imageFilepath}/${trader}.jpg`);
    }
    generateMap(container) {
        const Logger = container.resolve("WinstonLogger");
        const PreAkiModLoader = container.resolve("PreAkiModLoader");
        const FuncDatabaseServer = container.resolve("DatabaseServer");
        const FuncImporterUtil = container.resolve("ImporterUtil");
        const VFS = container.resolve("VFS");
        const JsonUtil = container.resolve("JsonUtil");
        const ClientDB = FuncDatabaseServer.getTables();
        const ClientQuest = ClientDB.templates.quests;
        const ClientItem = ClientDB.templates.items;
        const ClientHideout = ClientDB.hideout.areas;
        const Profile = ClientDB.templates.profiles;
        const ModPath = PreAkiModLoader.getModPath("火神重工-重启");
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`);
        var Therapist = "5ac3b934156ae10c4430e83c";
        var Therapist2 = "54cb57776803fa99248b456e";
        var AssortData = ClientDB.traders[Therapist].assort;
        const Locale = ClientDB.locales.global["ch"];
        const ELocale = ClientDB.locales.global["en"];
        function getQuestName(id) {
            if (Locale[`${id} name`] != null) {
                return Locale[`${id} name`];
            }
            return "404 Not Found";
        }
        function getItemName(id) {
            if (Locale[`${id} Name`] != null) {
                return Locale[`${id} Name`];
            }
            return "404 Not Found";
        }
        var QuestMap = {};
        var ItemsMap = {};
        for (let q in ClientQuest) {
            QuestMap[getQuestName(ClientQuest[q]._id)] = ClientQuest[q]._id;
        }
        VFS.writeFile(`${ModPath}QuestMap.json`, JSON.stringify(QuestMap, null, 4));
        Notice("QuestMap generated successful.");
        for (let i in ClientItem) {
            ItemsMap[getItemName(ClientItem[i]._id)] = ClientItem[i]._id;
        }
        VFS.writeFile(`${ModPath}ItemMap.json`, JSON.stringify(ItemsMap, null, 4));
        Notice("ItemMap generated successful.");
        function Log(string) {
            Logger.logWithColor("[Console]: " + string, "white");
        }
        function Notice(string) {
            Logger.logWithColor("[Console]: " + string, "green");
        }
        function Error(string) {
            Logger.logWithColor("[Console]: " + string, "red");
        }
    }
    initKeyEdit(container) {
        const Logger = container.resolve("WinstonLogger");
        const PreAkiModLoader = container.resolve("PreAkiModLoader");
        const FuncDatabaseServer = container.resolve("DatabaseServer");
        const FuncImporterUtil = container.resolve("ImporterUtil");
        const VFS = container.resolve("VFS");
        const JsonUtil = container.resolve("JsonUtil");
        const ClientDB = FuncDatabaseServer.getTables();
        const ClientQuest = ClientDB.templates.quests;
        const ClientItem = ClientDB.templates.items;
        const ClientHideout = ClientDB.hideout.areas;
        const Profile = ClientDB.templates.profiles;
        const ModPath = PreAkiModLoader.getModPath("火神重工-重启");
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`);
        var Therapist = "5ac3b934156ae10c4430e83c";
        var Therapist2 = "54cb57776803fa99248b456e";
        var AssortData = ClientDB.traders[Therapist].assort;
        const Locale = ClientDB.locales.global["ch"];
        const ELocale = ClientDB.locales.global["en"];
        //钥匙耐久
        var key25 = [
            "63a3a93f8a56922e82001f5d", //废弃工厂符号钥匙
            "5780cf7f2459777de4559322", //符号钥匙
            "62987dfc402c7f69bf010923", //套间符号钥匙
            "64ccc25f95763a1ae376e447", //神秘房间符号钥匙
            "5d80c62a86f7744036212b3f", //RB-VO
            "5d80c60f86f77440373c4ece", //RB-BK
            "5ede7a8229445733cb4c18e2" //RB-PKPM
        ];
        var key40 = [
            "5448ba0b4bdc2d02308b456c", //工厂钥匙
            "63a39fc0af870e651d58e6ae", //15公寓钥匙
            "6582dbf0b8d7830efc45016f" //休息室钥匙
        ];
        var key1 = [
            "5d08d21286f774736e7c94c3", //Shturman钥匙
            "64d4b23dc1b37504b41ac2b6" //血腥钥匙
        ];
        for (let it in ClientDB.templates.items) {
            if (ClientDB.templates.items[it]._parent == "5c99f98d86f7745c314214b3") {
                ClientDB.templates.items[it]._props.MaximumNumberOfUsage = 100;
                for (var i = 0; i < key25.length; i++) {
                    if (ClientDB.templates.items[it]._id == key25[i]) {
                        ClientDB.templates.items[it]._props.MaximumNumberOfUsage = 25;
                    }
                }
                for (var j = 0; j < key40.length; j++) {
                    if (ClientDB.templates.items[it]._id == key40[j]) {
                        ClientDB.templates.items[it]._props.MaximumNumberOfUsage = 50;
                    }
                }
                for (var k = 0; k < key1.length; k++) {
                    if (ClientDB.templates.items[it]._id == key1[k]) {
                        ClientDB.templates.items[it]._props.MaximumNumberOfUsage = 1;
                    }
                }
            }
        }
        function Log(string) {
            Logger.logWithColor("[Console]: " + string, "white");
        }
        function Notice(string) {
            Logger.logWithColor("[Console]: " + string, "green");
        }
        function Error(string) {
            Logger.logWithColor("[Console]: " + string, "red");
        }
    }
    initQuestCond(container) {
        const Logger = container.resolve("WinstonLogger");
        const PreAkiModLoader = container.resolve("PreAkiModLoader");
        const FuncDatabaseServer = container.resolve("DatabaseServer");
        const FuncImporterUtil = container.resolve("ImporterUtil");
        const VFS = container.resolve("VFS");
        const JsonUtil = container.resolve("JsonUtil");
        const ClientDB = FuncDatabaseServer.getTables();
        const ClientQuest = ClientDB.templates.quests;
        const ClientItem = ClientDB.templates.items;
        const ClientHideout = ClientDB.hideout.areas;
        const Profile = ClientDB.templates.profiles;
        const ModPath = PreAkiModLoader.getModPath("火神重工-重启");
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`);
        var Therapist = "5ac3b934156ae10c4430e83c";
        var Therapist2 = "54cb57776803fa99248b456e";
        var AssortData = ClientDB.traders[Therapist].assort;
        const Locale = ClientDB.locales.global["ch"];
        const ELocale = ClientDB.locales.global["en"];
        for (let quest in DB.templates.QuestData.Vulcan.QuestConditions) {
            var Q = DB.templates.QuestData.Vulcan.QuestConditions[quest];
            var Start = Q.Start;
            var Finish = Q.Finish;
            var Fail = Q.Fail;
            const Quest = ClientDB.templates.quests[quest];
            if (Start.Override == true) {
                Quest.conditions.AvailableForStart = [];
            }
            if (Finish.Override == true) {
                Quest.conditions.AvailableForFinish = [];
            }
            const QStart = Quest.conditions.AvailableForStart;
            const QFinish = Quest.conditions.AvailableForFinish;
            if (Start.Data.length > 0) {
                for (var i = 0; i < Start.Data.length; i++) {
                    var Data = Start.Data[i];
                    switch (Data.type) {
                        case "Quest":
                            {
                                QStart.push({
                                    "availableAfter": 0,
                                    "conditionType": "Quest",
                                    "dispersion": 0,
                                    "dynamicLocale": false,
                                    "globalQuestCounterId": "",
                                    "id": Data.id,
                                    "index": i,
                                    "parentId": "",
                                    "status": Data.status,
                                    "target": Data.questid,
                                    "visibilityConditions": []
                                });
                            }
                            break;
                        case "Level":
                            {
                                QStart.push({
                                    "compareMethod": ">=",
                                    "conditionType": "Level",
                                    "dynamicLocale": false,
                                    "globalQuestCounterId": "",
                                    "id": Data.id,
                                    "index": i,
                                    "parentId": "",
                                    "value": Data.count,
                                    "visibilityConditions": []
                                });
                            }
                            break;
                        case "Trust":
                            {
                                QStart.push({
                                    "compareMethod": ">=",
                                    "conditionType": "TraderLoyalty",
                                    "dynamicLocale": false,
                                    "globalQuestCounterId": "",
                                    "id": Data.id,
                                    "index": i,
                                    "parentId": "",
                                    "target": Data.trader,
                                    "value": Data.count,
                                    "visibilityConditions": []
                                });
                            }
                            break;
                    }
                }
            }
            if (Finish.Data.length > 0) {
                for (var i = 0; i < Finish.Data.length; i++) {
                    var Data = Finish.Data[i];
                    switch (Data.type) {
                        case "Find":
                            {
                                QFinish.push({
                                    "conditionType": "FindItem",
                                    "countInRaid": false,
                                    "dogtagLevel": 0,
                                    "dynamicLocale": false,
                                    "globalQuestCounterId": "",
                                    "id": Data.id,
                                    "index": i,
                                    "isEncoded": false,
                                    "maxDurability": 100,
                                    "minDurability": 0,
                                    "onlyFoundInRaid": Data.inraid,
                                    "parentId": "",
                                    "target": [
                                        Data.itemid
                                    ],
                                    "value": Data.count,
                                    "visibilityConditions": []
                                });
                            }
                            break;
                        case "Hand":
                            {
                                QFinish.push({
                                    "conditionType": "HandoverItem",
                                    "dogtagLevel": 0,
                                    "dynamicLocale": false,
                                    "globalQuestCounterId": "",
                                    "id": Data.id,
                                    "index": i,
                                    "isEncoded": false,
                                    "maxDurability": 100,
                                    "minDurability": 0,
                                    "onlyFoundInRaid": Data.inraid,
                                    "parentId": "",
                                    "target": [
                                        Data.itemid
                                    ],
                                    "value": Data.count,
                                    "visibilityConditions": []
                                });
                            }
                            break;
                        case "Kill":
                            {
                                QFinish.push({
                                    "completeInSeconds": 0,
                                    "conditionType": "CounterCreator",
                                    "counter": {
                                        "conditions": [],
                                        "id": Data.counterid
                                    },
                                    "doNotResetIfCounterCompleted": false,
                                    "dynamicLocale": false,
                                    "globalQuestCounterId": "",
                                    "id": Data.id,
                                    "index": i,
                                    "oneSessionOnly": Data.oneraid,
                                    "parentId": "",
                                    "type": "Elimination",
                                    "value": Data.count,
                                    "visibilityConditions": []
                                });
                                QFinish[QFinish.length - 1].counter.conditions.push({
                                    "bodyPart": [],
                                    "compareMethod": ">=",
                                    "conditionType": "Kills",
                                    "daytime": {
                                        "from": Data.daytime[0],
                                        "to": Data.daytime[1]
                                    },
                                    "distance": {
                                        "compareMethod": Data.distancetype,
                                        "value": Data.distance
                                    },
                                    "dynamicLocale": false,
                                    "enemyEquipmentExclusive": [],
                                    "enemyEquipmentInclusive": [],
                                    "enemyHealthEffects": [],
                                    "id": Data.conditionid,
                                    "resetOnSessionEnd": false,
                                    "savageRole": Data.role,
                                    "target": Data.bot,
                                    "value": 1,
                                    "weapon": Data.weapon,
                                    "weaponCaliber": [],
                                    "weaponModsExclusive": [],
                                    "weaponModsInclusive": []
                                });
                                if (Data.location.length > 0) {
                                    QFinish[QFinish.length - 1].counter.conditions.push({
                                        "conditionType": "Location",
                                        "dynamicLocale": false,
                                        "id": Data.locationid,
                                        "target": Data.location
                                    });
                                }
                                if (Data.havezone) {
                                    QFinish[QFinish.length - 1].counter.conditions.push({
                                        "conditionType": "InZone",
                                        "dynamicLocale": false,
                                        "id": Data.zoneid,
                                        "zoneIds": Data.zone
                                    });
                                }
                                if (Data.haveEquip) {
                                    QFinish[QFinish.length - 1].counter.conditions.push({
                                        "IncludeNotEquippedItems": false,
                                        "conditionType": "Equipment",
                                        "dynamicLocale": false,
                                        "equipmentExclusive": [],
                                        "equipmentInclusive": Data.Equip,
                                        "id": Data.EquipID
                                    });
                                }
                            }
                            break;
                        case "Level":
                            {
                                QFinish.push({
                                    "conditionType": "Level",
                                    "id": Data.id,
                                    "index": i,
                                    "parentId": "",
                                    "dynamicLocale": false,
                                    "value": Data.count,
                                    "compareMethod": ">=",
                                    "visibilityConditions": [],
                                    "isEncoded": false,
                                    "countInRaid": false,
                                    "globalQuestCounterId": ""
                                });
                            }
                            break;
                        case "Visit":
                            {
                                QFinish.push({
                                    "completeInSeconds": 0,
                                    "conditionType": "CounterCreator",
                                    "counter": {
                                        "conditions": [
                                            {
                                                "conditionType": "VisitPlace",
                                                "dynamicLocale": false,
                                                "id": Data.conditionid,
                                                "target": Data.zoneid,
                                                "value": 1
                                            }
                                        ],
                                        "id": Data.counterid
                                    },
                                    "doNotResetIfCounterCompleted": false,
                                    "dynamicLocale": false,
                                    "globalQuestCounterId": "",
                                    "id": Data.id,
                                    "index": i,
                                    "oneSessionOnly": Data.oneraid,
                                    "parentId": "",
                                    "type": "Exploration",
                                    "value": 1,
                                    "visibilityConditions": []
                                });
                            }
                            break;
                        case "Leave": {
                            QFinish.push({
                                "conditionType": "LeaveItemAtLocation",
                                "dogtagLevel": 0,
                                "dynamicLocale": false,
                                "globalQuestCounterId": "",
                                "id": Data.id,
                                "index": i,
                                "isEncoded": false,
                                "maxDurability": 100,
                                "minDurability": 0,
                                "onlyFoundInRaid": false,
                                "parentId": "",
                                "plantTime": Data.time,
                                "target": [
                                    Data.itemid
                                ],
                                "value": Data.count,
                                "visibilityConditions": [],
                                "zoneId": Data.zoneid
                            });
                        }
                    }
                }
            }
        }
        function Log(string) {
            Logger.logWithColor("[Console]: " + string, "white");
        }
        function Notice(string) {
            Logger.logWithColor("[Console]: " + string, "green");
        }
        function Error(string) {
            Logger.logWithColor("[Console]: " + string, "red");
        }
    }
    initHideout(container) {
        const Logger = container.resolve("WinstonLogger");
        const PreAkiModLoader = container.resolve("PreAkiModLoader");
        const FuncDatabaseServer = container.resolve("DatabaseServer");
        const FuncImporterUtil = container.resolve("ImporterUtil");
        const VFS = container.resolve("VFS");
        const JsonUtil = container.resolve("JsonUtil");
        const ClientDB = FuncDatabaseServer.getTables();
        const ClientQuest = ClientDB.templates.quests;
        const ClientItem = ClientDB.templates.items;
        const ClientHideout = ClientDB.hideout.areas;
        const Profile = ClientDB.templates.profiles;
        const ModPath = PreAkiModLoader.getModPath("火神重工-重启");
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`);
        var Therapist = "5ac3b934156ae10c4430e83c";
        var Therapist2 = "54cb57776803fa99248b456e";
        var AssortData = ClientDB.traders[Therapist].assort;
        const Locale = ClientDB.locales.global["ch"];
        const ELocale = ClientDB.locales.global["en"];
        const customHideout = DB.templates.HideoutData.Vulcan.HideoutData;
        const AreaMap = customHideout.AreaType;
        const hideout = customHideout.Hideout;
        const recipe = DB.templates.HideoutData.Vulcan.RecipeData;
        const sc = DB.templates.HideoutData.Vulcan.ScavCaseData;
        ClientDB.hideout.production.find(x => x.endProduct == "5e85a9f4add9fe03027d9bf1").requirements.push({
            "templateId": "荧石粉",
            "count": 1,
            "isFunctional": false,
            "isEncoded": false,
            "type": "Item"
        });
        ClientDB.hideout.production.find(x => x.endProduct == "5a0c27731526d80618476ac4").requirements.find(x => x.templateId == "590c5a7286f7747884343aea").templateId = "荧石粉";
        //ClientDB.hideout.production[25].requirements.push({
        ClientItem["5733279d245977289b77ec24"]._props.MaxResource = 40;
        ClientItem["5733279d245977289b77ec24"]._props.Resource = 40;
        ClientItem["5733279d245977289b77ec24"]._parent = "5d650c3e815116009f6201d2";
        ClientItem["5d03794386f77420415576f5"]._props.MaxResource = 150;
        ClientItem["5d03794386f77420415576f5"]._props.Resource = 150;
        ClientItem["5d03794386f77420415576f5"]._parent = "5d650c3e815116009f6201d2";
        //太阳能需求修改
        for (var i = 0; i < ClientHideout.length; i++) {
            if (ClientHideout[i].type == 18) {
                ClientHideout[i].stages["1"].bonuses[0].value = -60;
            }
            if (ClientHideout[i].type == 4) {
                ClientHideout[i].stages["1"].bonuses[0].filter.push("5733279d245977289b77ec24"); //汽车蓄电池
                ClientHideout[i].stages["2"].bonuses[0].filter.push("5d03794386f77420415576f5"); //坦克电池
                ClientHideout[i].stages["3"].bonuses[0].filter.push("能量水晶");
                ClientHideout[i].stages["3"].bonuses[0].filter.push("兰波顿水晶");
            }
            if (ClientHideout[i].type == 6) {
                //ClientHideout[i].stages["3"].bonuses[1].filter.push("5733279d245977289b77ec24") //滤罐
            }
        }
        for (var i = 0; i < ClientHideout.length; i++) {
            for (let a in hideout) {
                const Area = ClientHideout[i];
                const type = AreaMap[a];
                var Req = [];
                if (Area.type == AreaMap[a]) {
                    for (let l1 in Area.stages) {
                        if (hideout[a].Level[l1]) {
                            if (!isEmptyObject(hideout[a].Level[l1].require)) {
                                for (let r in hideout[a].Level[l1].require) {
                                    Req.push({
                                        "templateId": r,
                                        "count": hideout[a].Level[l1].require[r],
                                        "isFunctional": false,
                                        "isEncoded": false,
                                        "type": "Item"
                                    });
                                }
                            }
                            if (!isEmptyObject(hideout[a].Level[l1].area)) {
                                for (let r in hideout[a].Level[l1].area) {
                                    Req.push({
                                        "areaType": AreaMap[r],
                                        "requiredLevel": hideout[a].Level[l1].area[r],
                                        "type": "Area"
                                    });
                                }
                            }
                            if (!isEmptyObject(hideout[a].Level[l1].trader)) {
                                for (let r in hideout[a].Level[l1].trader) {
                                    Req.push({
                                        "traderId": r,
                                        "loyaltyLevel": hideout[a].Level[l1].trader[r],
                                        "type": "TraderLoyalty"
                                    });
                                }
                            }
                            Area.stages[l1].requirements = Req;
                            Area.stages[l1].constructionTime = hideout[a].Level[l1].time;
                        }
                    }
                }
            }
        }
        for (let i in recipe) {
            var R = recipe[i];
            ClientDB.hideout.production.push({
                _id: R.ID,
                areaType: R.Area,
                requirements: [],
                productionTime: R.Time,
                needFuelForAllProductionTime: R.NeedFuel,
                locked: R.Locked,
                endProduct: R.Output,
                continuous: false,
                count: R.OutputCount,
                productionLimitCount: 0,
                isEncoded: false
            });
            ClientDB.hideout.production[ClientDB.hideout.production.length - 1].requirements.push({
                areaType: R.Area,
                requiredLevel: R.AreaLevel,
                type: "Area"
            });
            if (R.Locked == true) {
                ClientDB.hideout.production[ClientDB.hideout.production.length - 1].requirements.push({
                    questId: R.Quest,
                    type: "QuestComplete"
                });
                const Reward = ClientDB.templates.quests[R.Quest].rewards.Success;
                Reward.push({
                    id: R.ID,
                    index: 0,
                    items: [
                        {
                            _id: R.ID + R.Output,
                            _tpl: R.Output,
                            upd: {
                                SpawnedInSession: true,
                                StackObjectsCount: 1
                            }
                        }
                    ],
                    loyaltyLevel: R.AreaLevel,
                    target: R.ID + R.Output,
                    traderId: R.Area,
                    type: "ProductionScheme"
                });
            }
            for (let j in R.Require.Tool) {
                ClientDB.hideout.production[ClientDB.hideout.production.length - 1].requirements.push({
                    templateId: j,
                    "type": "Tool"
                });
            }
            for (let j in R.Require.Item) {
                ClientDB.hideout.production[ClientDB.hideout.production.length - 1].requirements.push({
                    templateId: j,
                    "count": R.Require.Item[j],
                    "isFunctional": false,
                    "isEncoded": false,
                    "type": "Item"
                });
            }
            //ClientDB.hideout.production.push(result)
        }
        for (let i in sc) {
            ClientDB.hideout.scavcase.push(sc[i]);
        }
        function isEmptyObject(obj) {
            return Object.keys(obj).length === 0;
        }
    }
    initBotEdit(container) {
        const Logger = container.resolve("WinstonLogger");
        const PreAkiModLoader = container.resolve("PreAkiModLoader");
        const FuncDatabaseServer = container.resolve("DatabaseServer");
        const FuncImporterUtil = container.resolve("ImporterUtil");
        const imageRouter = container.resolve("ImageRouter");
        const launcherCallbacks = container.resolve("LauncherCallbacks");
        const configServer = container.resolve("ConfigServer");
        const VFS = container.resolve("VFS");
        const JsonUtil = container.resolve("JsonUtil");
        const ClientDB = FuncDatabaseServer.getTables();
        const ClientQuest = ClientDB.templates.quests;
        const ClientItem = ClientDB.templates.items;
        const ClientHideout = ClientDB.hideout.areas;
        const ModPath = PreAkiModLoader.getModPath("火神重工-重启");
        const imageFilepath = `./${ModPath}db/avatar/`;
        const iconPath = `${ModPath}images/quests/`;
        const iconList = VFS.getFiles(iconPath);
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`);
        const Recipe = FuncImporterUtil.loadRecursive(`${ModPath}Recipe/`);
        const Hideout = FuncImporterUtil.loadRecursive(`${ModPath}Hideout/`);
        const ServerVersion = launcherCallbacks.getServerVersion();
        //const SVCheck = versionFormatCheck(ServerVersion)
        const ReshalaChance = 40;
        for (var i = 0; i < ClientDB.locations["bigmap"].base.BossLocationSpawn.length; i++) {
            const BossSpawn = ClientDB.locations["bigmap"].base.BossLocationSpawn;
            if (BossSpawn[i].BossName == "bossBully") {
                BossSpawn[i].BossChance = ReshalaChance;
                //CustomLog(BossSpawn[i].BossEscortAmount)
                //BossSpawn[i].BossEscortAmount = 2
                //CustomLog(BossSpawn[i].BossEscortAmount)
                //BossSpawn[i].BossZone = "ZoneCustoms"
            }
        }
        var BossList = [
            "assault",
            "bosstagilla",
            "bossbully",
            "bossboar",
            "bossgluhar",
            "bosssanitar",
            "bosskilla",
            "bosskojaniy",
            "bosszryachiy",
            "bosskolontay",
            "bossknight",
            "followerbigpipe",
            "followerbirdeye",
            "sectantpriest",
            "sectantwarrior",
            "marksman",
            "cursedassault",
            "followerbully",
            "followergluharassault",
            "followergluharscout",
            "followergluharsecurity",
            "followergluharsnipe",
            "followerkojaniy",
            "followersanitar",
            "followerboar",
            "pmcbot",
            "exUsec",
            "bossboarsniper",
            "arenafighter",
            "arenafighterevent",
            "crazyassaultevent",
            "gifter"
        ];
        const botConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.BOT);
        for (var i = 0; i < BossList.length; i++) {
            botConfig.botRolesWithDogTags.push(BossList[i]);
        }
        /*
        for(let i in DB.bots.types.Reshala.inventory.items){
            var CacheObj = {}
            CacheObj[i] = {}
            for(var j = 0; j < DB.bots.types.Reshala.inventory.items[i].length; j++){
                CacheObj[i][DB.bots.types.Reshala.inventory.items[i][j]] = 1
            }
            DB.bots.types.Reshala.inventory.items[i] = CacheObj[i]
        }
        for(let i in DB.bots.types.ReshalaFollower.inventory.items){
            var CacheObj = {}
            CacheObj[i] = {}
            for(var j = 0; j < DB.bots.types.ReshalaFollower.inventory.items[i].length; j++){
                CacheObj[i][DB.bots.types.ReshalaFollower.inventory.items[i][j]] = 1
            }
            DB.bots.types.ReshalaFollower.inventory.items[i] = CacheObj[i]
        }
        VFS.writeFile(`${ModPath}rsla.json`, JSON.stringify(DB.bots.types.Reshala, null, 4))
        VFS.writeFile(`${ModPath}rslaf.json`, JSON.stringify(DB.bots.types.ReshalaFollower, null, 4))
        */
        //适配380的动态装备调整
        ClientDB.bots.types.bossbully.chances.equipment = DB.bots.types.Reshala.chances.equipment;
        ClientDB.bots.types.bossbully.chances.weaponMods = DB.bots.types.Reshala.chances.weaponMods;
        ClientDB.bots.types.bossbully.chances.equipmentMods = DB.bots.types.Reshala.chances.equipmentMods;
        ClientDB.bots.types.bossbully.experience.reward = DB.bots.types.Reshala.experience.reward;
        ClientDB.bots.types.bossbully.health = DB.bots.types.Reshala.health;
        ClientDB.bots.types.bossbully.inventory = DB.bots.types.Reshala.inventory;
        ClientDB.bots.types.bossbully.skills = DB.bots.types.Reshala.skills;
        ClientDB.bots.types.bossbully.generation.items = {
            "backpackLoot": {
                "weights": {
                    "0": 0,
                    "1": 0,
                    "2": 0,
                    "3": 0,
                    "4": 5,
                    "5": 4,
                    "6": 3,
                    "7": 2,
                    "8": 1
                },
                "whitelist": []
            },
            "drugs": {
                "weights": {
                    "0": 0,
                    "1": 0,
                    "2": 4,
                    "3": 3,
                    "4": 2,
                    "5": 1
                },
                "whitelist": []
            },
            "grenades": {
                "weights": {
                    "0": 0,
                    "1": 0,
                    "2": 5,
                    "3": 4,
                    "4": 2,
                    "5": 1
                },
                "whitelist": []
            },
            "healing": {
                "weights": {
                    "1": 0,
                    "2": 0,
                    "3": 2,
                    "4": 1
                },
                "whitelist": []
            },
            "magazines": {
                "weights": {
                    "0": 0,
                    "1": 0,
                    "2": 1,
                    "3": 2,
                    "4": 4
                },
                "whitelist": []
            },
            "pocketLoot": {
                "weights": {
                    "0": 0,
                    "1": 0,
                    "2": 4,
                    "3": 3,
                    "4": 1
                },
                "whitelist": []
            },
            "specialItems": {
                "weights": {
                    "0": 1,
                    "1": 1
                },
                "whitelist": []
            },
            "stims": {
                "weights": {
                    "0": 0,
                    "1": 0,
                    "2": 0,
                    "3": 5,
                    "4": 4,
                    "5": 3,
                    "6": 2
                },
                "whitelist": []
            },
            "vestLoot": {
                "weights": {
                    "0": 0,
                    "1": 0,
                    "2": 0,
                    "3": 0,
                    "4": 5,
                    "5": 3,
                    "6": 1
                },
                "whitelist": []
            }
        };
        ClientDB.bots.types.followerbully.chances.equipment = DB.bots.types.ReshalaFollower.chances.equipment;
        ClientDB.bots.types.followerbully.chances.weaponMods = DB.bots.types.ReshalaFollower.chances.weaponMods;
        ClientDB.bots.types.followerbully.chances.equipmentMods = DB.bots.types.ReshalaFollower.chances.equipmentMods;
        ClientDB.bots.types.followerbully.experience.reward = DB.bots.types.ReshalaFollower.experience.reward;
        ClientDB.bots.types.followerbully.health = DB.bots.types.ReshalaFollower.health;
        ClientDB.bots.types.followerbully.inventory = DB.bots.types.ReshalaFollower.inventory;
        ClientDB.bots.types.followerbully.skills = DB.bots.types.ReshalaFollower.skills;
        ClientDB.bots.types.followerbully.generation.items = {
            "backpackLoot": {
                "weights": {
                    "0": 0,
                    "1": 0,
                    "2": 0,
                    "3": 5,
                    "4": 4,
                    "5": 3,
                    "6": 1,
                    "7": 0
                },
                "whitelist": []
            },
            "drugs": {
                "weights": {
                    "0": 0,
                    "1": 1,
                    "2": 3,
                    "3": 2,
                    "4": 1
                },
                "whitelist": []
            },
            "grenades": {
                "weights": {
                    "0": 0,
                    "1": 5,
                    "2": 3,
                    "3": 1
                },
                "whitelist": []
            },
            "healing": {
                "weights": {
                    "1": 1,
                    "2": 1,
                    "3": 1
                },
                "whitelist": []
            },
            "magazines": {
                "weights": {
                    "0": 0,
                    "1": 0,
                    "2": 1,
                    "3": 2,
                    "4": 4
                },
                "whitelist": []
            },
            "pocketLoot": {
                "weights": {
                    "0": 0,
                    "1": 0,
                    "2": 4,
                    "3": 2,
                    "4": 1
                },
                "whitelist": []
            },
            "specialItems": {
                "weights": {
                    "0": 1
                },
                "whitelist": []
            },
            "stims": {
                "weights": {
                    "0": 0,
                    "1": 0,
                    "2": 2,
                    "3": 4,
                    "4": 3,
                    "5": 1,
                    "6": 1
                },
                "whitelist": []
            },
            "vestLoot": {
                "weights": {
                    "0": 0,
                    "1": 0,
                    "2": 0,
                    "3": 4,
                    "4": 3,
                    "5": 2,
                    "6": 1
                },
                "whitelist": []
            }
        };
        ClientDB.bots.types.sectantpriest.chances.weaponMods = DB.bots.types.Priest.chances.weaponMods;
        ClientDB.bots.types.sectantpriest.inventory = DB.bots.types.Priest.inventory;
        ClientDB.bots.types.sectantpriest.difficulty = DB.bots.types.Priest.difficulty;
    }
    initWepons(container) {
        const Logger = container.resolve("WinstonLogger");
        const PreAkiModLoader = container.resolve("PreAkiModLoader");
        const FuncDatabaseServer = container.resolve("DatabaseServer");
        const FuncImporterUtil = container.resolve("ImporterUtil");
        const imageRouter = container.resolve("ImageRouter");
        const launcherCallbacks = container.resolve("LauncherCallbacks");
        const configServer = container.resolve("ConfigServer");
        const VFS = container.resolve("VFS");
        const JsonUtil = container.resolve("JsonUtil");
        const ClientDB = FuncDatabaseServer.getTables();
        const ClientQuest = ClientDB.templates.quests;
        const ClientItem = ClientDB.templates.items;
        const ClientHideout = ClientDB.hideout.areas;
        const ModPath = PreAkiModLoader.getModPath("火神重工-重启");
        const imageFilepath = `./${ModPath}db/avatar/`;
        const iconPath = `${ModPath}images/quests/`;
        const iconList = VFS.getFiles(iconPath);
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`);
        const Recipe = FuncImporterUtil.loadRecursive(`${ModPath}Recipe/`);
        const Hideout = FuncImporterUtil.loadRecursive(`${ModPath}Hideout/`);
        const ServerVersion = launcherCallbacks.getServerVersion();
        //原版武器修改
        //AK12 
        var muzzlearr = [
            "5ac72e945acfc43f3b691116",
            "5ac7655e5acfc40016339a19",
            "5649aa744bdc2ded0b8b457e",
            "5f633f791b231926f2329f13",
            "5943eeeb86f77412d6384f6b",
            "5cc9a96cd7f00c011c04e04a",
            "615d8f5dd92c473c770212ef",
            "5649ab884bdc2ded0b8b457f",
            "57dc324a24597759501edc20",
            "59bffc1f86f77435b128b872",
            "593d493f86f7745e6b2ceb22",
            "564caa3d4bdc2d17108b458e",
            "57ffb0e42459777d047111c5"
        ];
        ClientItem["6499849fc93611967b034949"]._props.Slots[5]._props.filters[0].Filter.push("59ecc28286f7746d7a68aa8c"); //锁扣
        for (var i = 0; i < muzzlearr.length; i++) { //枪口
            ClientItem["6499849fc93611967b034949"]._props.Slots[2]._props.filters[0].Filter.push(muzzlearr[i]);
        }
        ClientItem["6499849fc93611967b034949"]._props.bFirerate = 650;
        ClientItem["6499849fc93611967b034949"]._props.RecoilForceUp = 83;
        ClientItem["6499849fc93611967b034949"]._props.RecoilForceBack = 272;
        ClientItem["6499849fc93611967b034949"]._props.Slots[4]._props.filters[0].Filter.push("5d2c770c48f0354b4a07c100"); //机匣盖
        ClientItem["6499849fc93611967b034949"]._props.Slots[4]._props.filters[0].Filter.push("5d2c76ed48f03532f2136169");
    }
    initLoot(container) {
        const Logger = container.resolve("WinstonLogger");
        const PreAkiModLoader = container.resolve("PreAkiModLoader");
        const FuncDatabaseServer = container.resolve("DatabaseServer");
        const FuncImporterUtil = container.resolve("ImporterUtil");
        const VFS = container.resolve("VFS");
        const JsonUtil = container.resolve("JsonUtil");
        const ClientDB = FuncDatabaseServer.getTables();
        const ClientQuest = ClientDB.templates.quests;
        const ClientItem = ClientDB.templates.items;
        const ClientHideout = ClientDB.hideout.areas;
        const Profile = ClientDB.templates.profiles;
        const ModPath = PreAkiModLoader.getModPath("火神重工-重启");
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`);
        var Therapist = "5ac3b934156ae10c4430e83c";
        var Therapist2 = "54cb57776803fa99248b456e";
        var AssortData = ClientDB.traders[Therapist].assort;
        const Locale = ClientDB.locales.global["ch"];
        const ELocale = ClientDB.locales.global["en"];
        //ClientDB.locations.bigmap.looseLoot.spawnpointsForced = []
        ClientDB.locations.bigmap.looseLoot.spawnpointsForced.push({
            "locationId": "(418.2162 2.0644 39.1542)",
            "probability": 1,
            "template": {
                "Id": "(418.2162 2.0644 39.1542)",
                "IsStatic": false,
                "useGravity": false,
                "randomRotation": false,
                "Position": {
                    "x": 418.2162,
                    "y": 2.0644,
                    "z": 39.1542
                },
                "Rotation": {
                    "x": 90,
                    "y": 60,
                    "z": 0
                },
                "IsGroupPosition": false,
                "GroupPositions": [],
                "IsAlwaysSpawn": false,
                "Root": "daynight",
                "Items": [
                    {
                        "_id": "daynight",
                        "_tpl": "恒常日月之盐"
                    }
                ]
            }
        });
        ClientDB.locations.bigmap.looseLoot.spawnpointsForced.push({
            "locationId": "(418.648 1.2477 36.6322)",
            "probability": 1,
            "template": {
                "Id": "(418.648 1.2477 36.6322)",
                "IsStatic": false,
                "useGravity": false,
                "randomRotation": false,
                "Position": {
                    "x": 418.648,
                    "y": 1.2477,
                    "z": 36.6322
                },
                "Rotation": {
                    "x": 340,
                    "y": 90,
                    "z": 0
                },
                "IsGroupPosition": false,
                "GroupPositions": [],
                "IsAlwaysSpawn": false,
                "Root": "storm",
                "Items": [
                    {
                        "_id": "storm",
                        "_tpl": "风暴轮转之盐"
                    }
                ]
            }
        });
        ClientDB.locations.laboratory.looseLoot.spawnpointsForced.push({
            "locationId": "(-266.706 5.088 -324.157)",
            "probability": 1,
            "template": {
                "Id": "(-266.706 5.088 -324.157)",
                "IsStatic": false,
                "useGravity": false,
                "randomRotation": false,
                "Position": {
                    "x": -266.706,
                    "y": 5.088,
                    "z": -324.157
                },
                "Rotation": {
                    "x": 0,
                    "y": 0,
                    "z": 270
                },
                "IsGroupPosition": false,
                "GroupPositions": [],
                "IsAlwaysSpawn": false,
                "Root": "aurora",
                "Items": [
                    {
                        "_id": "aurora",
                        "_tpl": "曙光制药的交易记录"
                    }
                ]
            }
        });
    }
    DogTagGenerator(bot) {
        function russianToLatinApproximation(russianString) {
            // 俄文字母到拉丁字母的映射表  
            const russianToLatinMap = {
                'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D',
                'Е': 'E', 'Ё': 'Yo', 'Ж': 'Zh', 'З': 'Z', 'И': 'I',
                'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
                'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T',
                'У': 'U', 'Ф': 'F', 'Х': 'Kh', 'Ц': 'Ts', 'Ч': 'Ch',
                'Ш': 'Sh', 'Щ': 'Sch', 'Э': 'E', 'Ю': 'Yu', 'Я': 'Ya',
                'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
                'е': 'e', 'ё': 'yo', 'ж': 'zh', 'з': 'z', 'и': 'i',
                'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
                'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
                'у': 'u', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch',
                'ш': 'sh', 'щ': 'sch', 'э': 'e', 'ю': 'yu', 'я': 'ya'
            };
            // 遍历字符串中的每个字符，并进行替换  
            let latinString = '';
            for (let i = 0; i < russianString.length; i++) {
                const char = russianString[i];
                // 检查字符是否在映射表中  
                if (russianToLatinMap.hasOwnProperty(char)) {
                    latinString += russianToLatinMap[char];
                }
                else {
                    // 如果字符不在映射表中，则保留原样（例如空格、标点符号等）  
                    latinString += char;
                }
            }
            return latinString;
        }
        function getLocalDateTimeString() {
            const date = new Date();
            // 获取本地时间的各个组成部分  
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以要+1  
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            // 拼接字符串  
            const dateTimeString = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
            return dateTimeString;
        }
        var DisplayBossList = [
            "bosstagilla",
            "bossbully",
            "bossboar",
            "bossgluhar",
            "bosssanitar",
            "bosskilla",
            "bosskojaniy",
            "bosszryachiy",
            "bosskolontay",
            "bossknight",
            "followerbigpipe",
            "followerbirdeye",
        ];
        var DeathStatus = [
            "已死亡",
            "停搏",
            "睡得很安详",
            "只是睡着了",
            "正在杀出冥界",
            "感受到了动能",
            "正在与科比八角笼",
            "SanCheck二连大失败",
            "也许还能抢救下",
            "转生到了异世界",
            "从高处摔了下来",
            "poke a stick at a grizzly bear",
            "✝升天✝"
        ];
        var BossName = "Nikita";
        switch (bot.Info.Settings.Role.toLowerCase()) {
            case "bossbully": {
                BossName = "Reshala";
                break;
            }
            case "bossboar": {
                BossName = "Kaban";
                break;
            }
            case "followerbigpipe": {
                BossName = "Big Pipe";
                break;
            }
            case "followerbirdeye": {
                BossName = "Birdeye";
                break;
            }
            default: {
                BossName = bot.Info.Settings.Role.substring(4);
            }
        }
        const dogtagUpd = {
            SpawnedInSession: true,
            Dogtag: {
                AccountId: bot.sessionId,
                ProfileId: bot._id,
                Nickname: bot.Info.Nickname,
                Side: bot.Info.Side,
                Level: bot.Info.Level,
                Time: (new Date().toISOString()),
                Status: "Killed by ",
                KillerAccountId: "Unknown",
                KillerProfileId: "Unknown",
                KillerName: "Unknown",
                WeaponName: "Unknown",
            },
        };
        const dogtagScavUpd = {
            SpawnedInSession: true,
            Dogtag: {
                AccountId: bot.sessionId,
                ProfileId: bot._id,
                Nickname: russianToLatinApproximation(bot.Info.Nickname),
                Side: bot.Info.Side,
                Level: 80,
                Time: getLocalDateTimeString(),
                Status: Math.random() <= 0.9 ? "已死亡" : DeathStatus[Math.floor(Math.random() * DeathStatus.length)],
                KillerAccountId: "Unknown",
                KillerProfileId: "Unknown",
                KillerName: "",
                WeaponName: "解析失败",
            },
        };
        const dogtagBossUpd = {
            SpawnedInSession: true,
            Dogtag: {
                AccountId: bot.sessionId,
                ProfileId: bot._id,
                Nickname: BossName,
                Side: bot.Info.Side,
                Level: 100,
                Time: getLocalDateTimeString(),
                Status: Math.random() <= 0.9 ? "已死亡" : DeathStatus[Math.floor(Math.random() * DeathStatus.length)],
                KillerAccountId: "Unknown",
                KillerProfileId: "Unknown",
                KillerName: "",
                WeaponName: "解析失败",
            },
        };
        const dogtagGoonsUpd = {
            SpawnedInSession: true,
            Dogtag: {
                AccountId: bot.sessionId,
                ProfileId: bot._id,
                Nickname: BossName,
                Side: "Usec",
                Level: 100,
                Time: getLocalDateTimeString(),
                Status: Math.random() <= 0.9 ? "已死亡" : DeathStatus[Math.floor(Math.random() * DeathStatus.length)],
                KillerAccountId: "Unknown",
                KillerProfileId: "Unknown",
                KillerName: "",
                WeaponName: "解析失败",
            },
        };
        const dogtagSectantUpd = {
            SpawnedInSession: true,
            Dogtag: {
                AccountId: bot.sessionId,
                ProfileId: bot._id,
                Nickname: russianToLatinApproximation(bot.Info.Nickname),
                Side: bot.Info.Side,
                Level: 99,
                Time: getLocalDateTimeString(),
                Status: "蒙主召唤",
                KillerAccountId: "Unknown",
                KillerProfileId: "Unknown",
                KillerName: "",
                WeaponName: "解析失败",
            },
        };
        //this.vfs.writeFile(`${this.preloader.getModPath("SeelesItemPack")}BotProfile/Cache.json`, JSON.stringify(bot, null, 4))
        //if (bot.Info.Side === "Savage") {
        //    console.log(JSON.stringify(bot.Info.Settings.Role, null, 4))
        //    console.log(JSON.stringify(bot.Info.Nickname, null, 4))
        //    console.log(JSON.stringify(bot.Info.LowerNickname, null, 4))
        //    console.log(JSON.stringify(bot.Info.Nickname.toLowerCase(), null, 4))
        //    console.log(JSON.stringify(bot.Info.Side, null, 4))
        //}
        const PMCinventoryItem = {
            _id: `${bot._id}_${bot.Info.Side}_${bot.Info.Nickname}_${Date.now()}`,
            _tpl: ((bot.Info.Side === "Usec") ? BaseClasses_1.BaseClasses.DOG_TAG_USEC : BaseClasses_1.BaseClasses.DOG_TAG_BEAR),
            parentId: bot.Inventory.equipment,
            slotId: "Dogtag",
            location: undefined,
            upd: dogtagUpd,
        };
        const SavageinventoryItem = {
            _id: `${bot._id}_${bot.Info.Side}_${bot.Info.Nickname}_${Date.now()}`,
            _tpl: "Scav狗牌",
            parentId: bot.Inventory.equipment,
            slotId: "Dogtag",
            location: undefined,
            upd: dogtagScavUpd,
        };
        const SectantinventoryItem = {
            _id: `${bot._id}_${bot.Info.Side}_${bot.Info.Nickname}_${Date.now()}`,
            _tpl: "邪教徒狗牌",
            parentId: bot.Inventory.equipment,
            slotId: "Dogtag",
            location: undefined,
            upd: dogtagSectantUpd,
        };
        const BossinventoryItem = {
            _id: `${bot._id}_${bot.Info.Side}_${bot.Info.Nickname}_${Date.now()}`,
            _tpl: "Boss狗牌",
            parentId: bot.Inventory.equipment,
            slotId: "Dogtag",
            location: undefined,
            upd: dogtagBossUpd,
        };
        const GoonsinventoryItem = {
            _id: `${bot._id}_${bot.Info.Side}_${bot.Info.Nickname}_${Date.now()}`,
            _tpl: "Boss狗牌",
            parentId: bot.Inventory.equipment,
            slotId: "Dogtag",
            location: undefined,
            upd: dogtagGoonsUpd,
        };
        if (DisplayBossList.includes(bot.Info.Settings.Role.toLowerCase())) {
            var bossStr = bot.Info.Settings.Role.toLowerCase();
            if (bossStr.includes("knight") || bossStr.includes("bird") || bossStr.includes("pipe")) {
                bot.Inventory.items.push(GoonsinventoryItem);
            }
            else {
                bot.Inventory.items.push(BossinventoryItem);
            }
        }
        else if (bot.Info.Settings.Role.toLowerCase().includes("sectant")) {
            bot.Inventory.items.push(SectantinventoryItem);
        }
        else {
            switch (bot.Info.Side) {
                case "Usec": {
                    bot.Inventory.items.push(PMCinventoryItem);
                    break;
                }
                case "Bear": {
                    bot.Inventory.items.push(PMCinventoryItem);
                    break;
                }
                case "Savage": {
                    bot.Inventory.items.push(SavageinventoryItem);
                    break;
                }
                default: {
                    bot.Inventory.items.push(SavageinventoryItem);
                    break;
                }
            }
        }
    }
}
module.exports = { mod: new Mod() };
//# sourceMappingURL=mod.js.map