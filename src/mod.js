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
const ConfigTypes_1 = require("C:/snapshot/project/obj/models/enums/ConfigTypes");
const Traders_1 = require("C:/snapshot/project/obj/models/enums/Traders");
//import { ITraderConfig, UpdateTime } from "C:/snapshot/project/obj/models/spt/config/ITraderConfig";
//
const baseJson = __importStar(require("../db/traders/Persicaria/base.json"));
const NSBase = __importStar(require("../db/traders/Polaris/base.json"));
//
class Mod {
    Traders;
    ["Persiciria"] = "Persiciria";
    preAkiLoad(container) {
        const Logger = container.resolve("WinstonLogger");
        const PreAkiModLoader = container.resolve("PreAkiModLoader");
        const configServer = container.resolve("ConfigServer");
        const FuncDatabaseServer = container.resolve("DatabaseServer");
        const FuncImporterUtil = container.resolve("ImporterUtil");
        const staticRouterModService = container.resolve("StaticRouterModService");
        const traderConfig = configServer.getConfig(ConfigTypes_1.ConfigTypes.TRADER);
        const ModPath = PreAkiModLoader.getModPath("火神重工-理性重构");
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`);
        const ClientDB = FuncDatabaseServer.getTables();
        const imageRouter = container.resolve("ImageRouter");
        const profileHelper = container.resolve("ProfileHelper");
        const JsonUtil = container.resolve("JsonUtil");
        Logger.logWithColor("[Console]: PreAkiLoadingAccess...", "yellow");
        this.setupTraderUpdateTime(traderConfig);
        this.registerProfileImage(PreAkiModLoader, imageRouter);
        Traders_1.Traders[baseJson._id] = baseJson._id;
    }
    postDBLoad(container) {
        const Logger = container.resolve("WinstonLogger");
        const PreAkiModLoader = container.resolve("PreAkiModLoader");
        const FuncDatabaseServer = container.resolve("DatabaseServer");
        const FuncImporterUtil = container.resolve("ImporterUtil");
        const imageRouter = container.resolve("ImageRouter");
        const launcherCallbacks = container.resolve("LauncherCallbacks");
        const VFS = container.resolve("VFS");
        const JsonUtil = container.resolve("JsonUtil");
        //const cs = container.resolve<VulcanConsole>("VulcanConsole")
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
        const ModPath = PreAkiModLoader.getModPath("火神重工-理性重构");
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
        //CustomAccess(launcherCallbacks.getServerVersion())
        //商人添加
        for (let trader in DB.traders) {
            ClientDB.traders[trader] = DB.traders[trader];
            var TraderBase = DB.traders[trader].base;
            var TraderID = TraderBase._id;
            ClientDB.locales.global["ch"][TraderID + " FullName"] = TraderBase.surname;
            ClientDB.locales.global["ch"][TraderID + " FirstName"] = TraderBase.name;
            ClientDB.locales.global["ch"][TraderID + " Nickname"] = TraderBase.nickname;
            ClientDB.locales.global["ch"][TraderID + " Location"] = TraderBase.location;
            ClientDB.locales.global["ch"][TraderID + " Description"] = TraderBase.description;
        }
        //任务奖励添加
        for (let rw in DB.templates.QuestReward) {
            addQuestReward(DB.templates.QuestReward[rw].questid, DB.templates.QuestReward[rw].rewarddata);
        }
        const AllItems = ClientDB.templates.items;
        Logger.logWithColor("[Console]: PostDataBaseLoadingAccess...", "yellow");
        CustomLog("心智云图已连接，正在加载数据……");
        //物品写入
        CustomLog("正在加载物品数据...");
        //dbHelper.loadItem(DB.templates.items)
        for (let item in DB.templates.items) {
            var Local = ClientDB.locales.global["ch"];
            var ItemData = DB.templates.items[item];
            ClientDB.templates.items[item] = DB.templates.items[item];
            Local[ItemData._id + " Name"] = ItemData._props.Name;
            Local[ItemData._id + " ShortName"] = ItemData._props.ShortName;
            Local[ItemData._id + " Description"] = ItemData._props.Description;
            ClientDB.templates.handbook.Items.push({
                "Id": ItemData._id,
                "ParentId": ItemData._props.RagfairType,
                "Price": ItemData._props.DefaultPrice
            });
            CustomLog("物品数据加载成功: " + ItemData._props.Name);
        }
        /*
        for (let item in DB.templates.nsitem) {
            var Local = ClientDB.locales.global["ch"]
            var ItemData = DB.templates.nsitem[item]
            ClientDB.templates.items[item] = DB.templates.nsitem[item]
            Local[ItemData._id + " Name"] = ItemData._props.Name
            Local[ItemData._id + " ShortName"] = ItemData._props.ShortName
            Local[ItemData._id + " Description"] = ItemData._props.Description
            ClientDB.templates.handbook.Items.push({
                "Id": ItemData._id,
                "ParentId": ItemData._props.RagfairType,
                "Price": ItemData._props.DefaultPrice
            })
            CustomLog("物品数据加载成功: " + ItemData._props.Name)
        }
        */
        const 公文包 = ClientDB.templates.items["外勤公文包"]._props.Grids[0]._props.filters[0].Filter;
        //#region 公文包容纳类型修复
        AddItemWithRagfairTag("5b47574386f77428ca22b2f1", 公文包); //贵重物品
        AddItemWithRagfairTag("5b47574386f77428ca22b337", 公文包); //药丸
        AddItemWithRagfairTag("5b47574386f77428ca22b33a", 公文包); //注射器
        AddItemWithRagfairTag("5b47574386f77428ca22b33b", 公文包); //子弹
        AddItemWithRagfairTag("5b47574386f77428ca22b341", 公文包); //情报物品
        AddItemWithRagfairTag("5b47574386f77428ca22b345", 公文包); //特殊装备
        AddItemWithRagfairTag("5b5f78b786f77447ed5636af", 公文包); //钱 
        AddItemWithRagfairTag("5c518ec986f7743b68682ce2", 公文包); //机械钥匙
        AddItemWithRagfairTag("5c518ed586f774119a772aee", 公文包); //电子钥匙
        AddItemWithRagfairTag("5b47574386f77428ca22b339", 公文包); //创伤治疗
        AddItemWithRagfairTag("5b47574386f77428ca22b336", 公文包); //食品
        AddItemWithRagfairTag("5b47574386f77428ca22b335", 公文包); //饮品
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
        //#endregion
        //私货
        for (let item in ClientDB.templates.items) {
            if (Config.FireworkGrenade == true) {
                ClientDB.templates.items[item]._props.FragmentsCount = 0;
                ClientDB.templates.items[item]._props.Strength = 0;
            }
        }
        var solareq = [
            {
                "areaType": 4,
                "requiredLevel": 3,
                "type": "Area"
            },
            {
                "templateId": "569668774bdc2da2298b4568",
                "count": 250000,
                "isFunctional": false,
                "isEncoded": false,
                "type": "Item"
            },
            {
                "traderId": "5a7c2eca46aef81a7ca2145d",
                "loyaltyLevel": 4,
                "type": "TraderLoyalty"
            },
            {
                "traderId": "Persicaria",
                "loyaltyLevel": 4,
                "type": "TraderLoyalty"
            },
            {
                "templateId": "59e366c186f7741778269d85",
                "count": 40,
                "isFunctional": false,
                "isEncoded": false,
                "type": "Item"
            },
            {
                "templateId": "5d03775b86f774203e7e0c4b",
                "count": 8,
                "isFunctional": false,
                "isEncoded": false,
                "type": "Item"
            },
            {
                "templateId": "5d0375ff86f774186372f685",
                "count": 20,
                "isFunctional": false,
                "isEncoded": false,
                "type": "Item"
            },
            {
                "templateId": "5d0376a486f7747d8050965c",
                "count": 12,
                "isFunctional": false,
                "isEncoded": false,
                "type": "Item"
            },
            {
                "templateId": "5d0378d486f77420421a5ff4",
                "count": 10,
                "isFunctional": false,
                "isEncoded": false,
                "type": "Item"
            },
            {
                "templateId": "5d03794386f77420415576f5",
                "count": 8,
                "isFunctional": false,
                "isEncoded": false,
                "type": "Item"
            },
            {
                "templateId": "6389c85357baa773a825b356",
                "count": 4,
                "isFunctional": false,
                "isEncoded": false,
                "type": "Item"
            },
            {
                "templateId": "太阳能模块",
                "count": 1,
                "isFunctional": false,
                "isEncoded": false,
                "type": "Item"
            }
        ];
        var btc3 = [
            {
                "areaType": 20,
                "requiredLevel": 2,
                "type": "Area"
            },
            {
                "areaType": 6,
                "requiredLevel": 3,
                "type": "Area"
            },
            {
                "templateId": "5734779624597737e04bf329",
                "count": 25,
                "isFunctional": false,
                "isEncoded": false,
                "type": "Item"
            },
            {
                "templateId": "5d1b39a386f774252339976f",
                "count": 15,
                "isFunctional": false,
                "isEncoded": false,
                "type": "Item"
            },
            {
                "templateId": "5d1b2fa286f77425227d1674",
                "count": 10,
                "isFunctional": false,
                "isEncoded": false,
                "type": "Item"
            },
            {
                "templateId": "5d1b327086f7742525194449",
                "count": 10,
                "isFunctional": false,
                "isEncoded": false,
                "type": "Item"
            },
            {
                "templateId": "5d03794386f77420415576f5",
                "count": 1,
                "isFunctional": false,
                "isEncoded": false,
                "type": "Item"
            }
        ];
        //太阳能需求修改
        for (var i = 0; i < ClientHideout.length; i++) {
            if (ClientHideout[i].type == 18) {
                ClientHideout[i].stages["1"].requirements = solareq;
                ClientHideout[i].stages["1"].constructionTime = 604800;
                ClientHideout[i].stages["1"].bonuses[0].value = -100;
            }
            if (ClientHideout[i].type == 20) {
                ClientHideout[i].stages["3"].requirements = btc3;
            }
        }
        //AddLockAssort("5a7c2eca46aef81a7ca2145d", "变压器", "6389c85357baa773a825b356", 9000000, 4, "太阳能维修")
        //钥匙耐久
        var key25 = [
            "63a3a93f8a56922e82001f5d",
            "5780cf7f2459777de4559322",
            "62987dfc402c7f69bf010923",
            "64ccc25f95763a1ae376e447",
            "5d80c62a86f7744036212b3f",
            "5d80c60f86f77440373c4ece",
            "5ede7a8229445733cb4c18e2" //RB-PKPM
        ];
        var key40 = [
            "5448ba0b4bdc2d02308b456c",
            "63a39fc0af870e651d58e6ae" //15公寓钥匙
        ];
        var key1 = [
            "5d08d21286f774736e7c94c3",
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
        //邮箱本地化文本处理
        for (let mails in DB.locales["ch"].mail) {
            ClientDB.locales.global["ch"][mails] = DB.locales["ch"].mail[mails];
        }
        for (let mails in DB.locales["ch"].nsmail) {
            ClientDB.locales.global["ch"][mails] = DB.locales["ch"].nsmail[mails];
        }
        //原版任务修改
        var sectantarr = []; //夜间扫荡
        ClientQuest["5c0be13186f7746f016734aa"].conditions.AvailableForFinish[0]._props.value = 15; //狙击疯魔
        ClientQuest["60e71c11d54b755a3b53eb65"].conditions.AvailableForFinish[0]._props.index = 2; //夜间扫荡
        ClientQuest["60e71c11d54b755a3b53eb65"].conditions.AvailableForFinish[1]._props.index = 3;
        sectantarr.push({
            "_parent": "CounterCreator",
            "_props": {
                "counter": {
                    "id": "夜间扫荡祭祀击杀目标指示",
                    "conditions": [
                        {
                            "_props": {
                                "target": "Savage",
                                "savageRole": [
                                    "sectantPriest"
                                ],
                                "id": "夜间扫荡祭祀击杀目标",
                                "dynamicLocale": false
                            },
                            "_parent": "Kills"
                        }
                    ]
                },
                "id": "夜间扫荡祭祀击杀",
                "index": 0,
                "parentId": "",
                "oneSessionOnly": false,
                "dynamicLocale": false,
                "type": "Elimination",
                "doNotResetIfCounterCompleted": false,
                "value": "4",
                "visibilityConditions": []
            },
            "dynamicLocale": false
        });
        sectantarr.push({
            "_parent": "CounterCreator",
            "_props": {
                "counter": {
                    "id": "夜间扫荡战士击杀目标指示",
                    "conditions": [
                        {
                            "_props": {
                                "target": "Savage",
                                "savageRole": [
                                    "sectantWarrior"
                                ],
                                "id": "夜间扫荡战士击杀目标",
                                "dynamicLocale": false
                            },
                            "_parent": "Kills"
                        }
                    ]
                },
                "id": "夜间扫荡战士击杀",
                "index": 1,
                "parentId": "",
                "oneSessionOnly": false,
                "dynamicLocale": false,
                "type": "Elimination",
                "doNotResetIfCounterCompleted": false,
                "value": "10",
                "visibilityConditions": []
            },
            "dynamicLocale": false
        });
        sectantarr.push(ClientQuest["60e71c11d54b755a3b53eb65"].conditions.AvailableForFinish[0]);
        sectantarr.push(ClientQuest["60e71c11d54b755a3b53eb65"].conditions.AvailableForFinish[1]);
        ClientQuest["60e71c11d54b755a3b53eb65"].conditions.AvailableForFinish = sectantarr;
        ClientQuest["5d6fbc2886f77449d825f9d3"].rewards.Success[0].value = 500; //导师
        ClientQuest["60e71d23c1bfa3050473b8e6"].rewards.Success[1].value = 500; //致命校准
        ClientQuest["60e71d23c1bfa3050473b8e6"].rewards.Success[1].target = "Sniper"; //致命校准
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
        //*/
        //服装生成
        CustomLog("正在加载服装数据...");
        for (let ct in DB.templates.custom) {
            var Local = ClientDB.locales.global["ch"];
            ClientDB.templates.customization[ct] = DB.templates.custom[ct];
            Local[ClientDB.templates.customization[ct]._id + " Name"] = ClientDB.templates.customization[ct]._props.Name;
            Local[ClientDB.templates.customization[ct]._id + " ShortName"] = ClientDB.templates.customization[ct]._props.ShortName;
            Local[ClientDB.templates.customization[ct]._id + " Description"] = ClientDB.templates.customization[ct]._props.Description;
            CustomLog("服装数据加载成功: " + Local[ClientDB.templates.customization[ct]._id + " Name"]);
        }
        //CustomLog("正在加载声线数据...")
        //声线读取, 修改
        //#region
        for (let ct in ClientDB.templates.customization) {
            var Custom = ClientDB.templates.customization[ct];
            var NameObj = ClientDB.templates.customization[ct]._props.Name;
            var Name = JSON.stringify(ClientDB.templates.customization[ct]._props.Name, null);
            var VoiceKilla = "6353fea0a644ca0c510d1dd8";
            var VoiceTagilla = "6353fec227f75f803206e60a";
            var VoiceReshala = "5fc615460b735e7b024c76eb";
            var VoiceSanitar = "5fc615710b735e7b024c76ed";
            var VoiceGlukhar = "5fc6155b0b735e7b024c76ec";
            var VoiceKnight = "6353fe74a644ca0c510d1dd6";
            var VoiceBigPipe = "6353fe04f0de2294830a0dbe";
            var VoiceBirdEye = "6353fe34f0de2294830a0dbf";
            var ID = ClientDB.templates.customization[ct]._id;
            if (typeof (Name) == 'string') {
                //CustomLog(typeof(Name))
                var Boss = Name.substring(1, 5);
                var Scav = Name.substring(1, 5);
                var Props = Custom._props;
                const Local = ClientDB.locales.global["ch"];
                const LocalEng = ClientDB.locales.global["en"];
                if (Custom._parent == "5fc100cf95572123ae738483") {
                    //CustomLog(Name)
                    switch (ID) {
                        case VoiceReshala:
                            NameObj = "Reshala";
                            Custom._props.Side.push("Bear");
                            Custom._props.Side.push("Usec");
                            Local[Custom._id + " Name"] = NameObj;
                            LocalEng[Custom._id + " Name"] = NameObj;
                            break;
                        case VoiceGlukhar:
                            NameObj = "Glukhar";
                            Custom._props.Side.push("Bear");
                            Custom._props.Side.push("Usec");
                            Local[Custom._id + " Name"] = NameObj;
                            LocalEng[Custom._id + " Name"] = NameObj;
                            break;
                        case VoiceSanitar:
                            NameObj = "Sanitar";
                            Custom._props.Side.push("Bear");
                            Custom._props.Side.push("Usec");
                            Local[Custom._id + " Name"] = NameObj;
                            LocalEng[Custom._id + " Name"] = NameObj;
                            break;
                        case VoiceBirdEye:
                            NameObj = "BirdEye";
                            Custom._props.Side.push("Bear");
                            Custom._props.Side.push("Usec");
                            Local[Custom._id + " Name"] = NameObj;
                            LocalEng[Custom._id + " Name"] = NameObj;
                            break;
                        case VoiceBigPipe:
                            NameObj = "BigPipe";
                            Custom._props.Side.push("Bear");
                            Custom._props.Side.push("Usec");
                            Local[Custom._id + " Name"] = NameObj;
                            LocalEng[Custom._id + " Name"] = NameObj;
                            break;
                        case VoiceKilla:
                            NameObj = "Killa";
                            Custom._props.Side.push("Bear");
                            Custom._props.Side.push("Usec");
                            Local[Custom._id + " Name"] = NameObj;
                            LocalEng[Custom._id + " Name"] = NameObj;
                            break;
                        case VoiceKnight:
                            NameObj = "Knight";
                            Custom._props.Side.push("Bear");
                            Custom._props.Side.push("Usec");
                            Local[Custom._id + " Name"] = NameObj;
                            LocalEng[Custom._id + " Name"] = NameObj;
                            break;
                        case VoiceTagilla:
                            NameObj = "Tagilla";
                            Custom._props.Side.push("Bear");
                            Custom._props.Side.push("Usec");
                            Local[Custom._id + " Name"] = NameObj;
                            LocalEng[Custom._id + " Name"] = NameObj;
                            break;
                    }
                    //NameObj = (Name.substring(5,Name.length-1) + "声线")   
                    //CustomLog(NameObj)
                    CustomLog("声线数据加载成功: " + Local[Custom._id + " Name"]);
                    //CustomLog(NameObj)
                    //CustomLog(Local[Custom._id + " Name"] = NameObj)
                    if (Scav == "Scav") {
                        //CustomLog(Name)
                        Custom._props.Side.push("Bear");
                        Custom._props.Side.push("Usec");
                        switch (NameObj) {
                            case "Scav_1":
                                NameObj = "Scav-1";
                                break;
                            case "Scav_2":
                                NameObj = "Scav-2";
                                break;
                            case "Scav_3":
                                NameObj = "Scav-3";
                                break;
                            case "Scav_4":
                                NameObj = "Scav-4";
                                break;
                            case "Scav_5":
                                NameObj = "Scav-5";
                                break;
                            case "Scav_6":
                                NameObj = "Scav-6";
                                break;
                        }
                        Local[Custom._id + " Name"] = NameObj;
                        LocalEng[Custom._id + " Name"] = NameObj;
                        CustomLog("声线数据加载成功: " + Local[Custom._id + " Name"]);
                    }
                }
            }
        }
        //#endregion
        //捏人头部写入
        for (let ct in ClientDB.templates.customization) {
            var Local = ClientDB.locales.global["ch"];
            var LocalEng = ClientDB.locales.global["en"];
            var HeadTagilla = "5d5f8ba486f77431254e7fd2"; //NoMesh
            var HeadKnight = "62875ad50828252c7a28b95c";
            var HeadBirdeye = "628b57d800f171376e7b2634";
            var HeadBigPipe = "6287b0d239d8207cb27d66c7";
            var HeadShturman = "5d5f8ba486f77431254e7fd2"; //NoMesh
            var HeadSanitar = "5e99767c86f7741ac7399393";
            var HeadReshala = "5d28b01486f77429242fc898";
            var HeadKilla = "5d28b03e86f7747f7e69ab8a";
            var HeadGlukhar = "5d5e805d86f77439eb4c2d0e";
            var HeadZryachiy = "636129784aa74b8fe30ab418";
            var HeadKaban = "64809e3077c11aeac5078e3c";
            var HeadScav_1 = "5cc2e4d014c02e000d0115f8";
            var HeadScav_2 = "5cde9ff17d6c8b0474535daa";
            var HeadScav_3 = "5f68c4a7c174a17c0f4c8945";
            var HeadScav_4 = "5f68c4c217d579077152a252";
            var HeadScav_5 = "5d28afe786f774292668618d";
            var Side = ClientDB.templates.customization[ct]._props.Side;
            var Name = ClientDB.templates.customization[ct]._props.Name;
            var ID = ClientDB.templates.customization[ct]._id;
            switch (ID) {
                case HeadKnight:
                    Side.push("Bear");
                    Side.push("Usec");
                    Name = "Knight";
                    Local[ID + " Name"] = Name;
                    LocalEng[ID + " Name"] = Name;
                    break;
                case HeadBirdeye:
                    Side.push("Bear");
                    Side.push("Usec");
                    Name = "Birdeye";
                    Local[ID + " Name"] = Name;
                    LocalEng[ID + " Name"] = Name;
                    break;
                case HeadBigPipe:
                    Side.push("Bear");
                    Side.push("Usec");
                    Name = "BigPipe";
                    Local[ID + " Name"] = Name;
                    LocalEng[ID + " Name"] = Name;
                    break;
                case HeadSanitar:
                    Side.push("Bear");
                    Side.push("Usec");
                    Name = "Sanitar";
                    Local[ID + " Name"] = Name;
                    LocalEng[ID + " Name"] = Name;
                    break;
                case HeadReshala:
                    Side.push("Bear");
                    Side.push("Usec");
                    Name = "Reshala";
                    Local[ID + " Name"] = Name;
                    LocalEng[ID + " Name"] = Name;
                    break;
                case HeadKilla:
                    Side.push("Bear");
                    Side.push("Usec");
                    Name = "Killa";
                    Local[ID + " Name"] = Name;
                    LocalEng[ID + " Name"] = Name;
                    break;
                case HeadGlukhar:
                    Side.push("Bear");
                    Side.push("Usec");
                    Name = "Glukhar";
                    Local[ID + " Name"] = Name;
                    LocalEng[ID + " Name"] = Name;
                    break;
                case HeadZryachiy:
                    Side.push("Bear");
                    Side.push("Usec");
                    Name = "Zryachiy";
                    Local[ID + " Name"] = Name;
                    LocalEng[ID + " Name"] = Name;
                    break;
                case HeadScav_1:
                    Side.push("Bear");
                    Side.push("Usec");
                    Name = "Scav-1";
                    Local[ID + " Name"] = Name;
                    LocalEng[ID + " Name"] = Name;
                    break;
                case HeadScav_2:
                    Side.push("Bear");
                    Side.push("Usec");
                    Name = "Scav-2";
                    Local[ID + " Name"] = Name;
                    LocalEng[ID + " Name"] = Name;
                    break;
                case HeadScav_3:
                    Side.push("Bear");
                    Side.push("Usec");
                    Name = "Scav-3";
                    Local[ID + " Name"] = Name;
                    LocalEng[ID + " Name"] = Name;
                    break;
                case HeadScav_4:
                    Side.push("Bear");
                    Side.push("Usec");
                    Name = "Scav-4";
                    Local[ID + " Name"] = Name;
                    LocalEng[ID + " Name"] = Name;
                    break;
                case HeadScav_5:
                    Side.push("Bear");
                    Side.push("Usec");
                    Name = "Scav-5";
                    Local[ID + " Name"] = Name;
                    LocalEng[ID + " Name"] = Name;
                    break;
            }
        }
        //任务图片添加
        for (const icon of iconList) {
            const filename = VFS.stripExtension(icon);
            imageRouter.addRoute(`/files/quest/icon/${filename}`, `${iconPath}${icon}`);
        }
        //任务写入
        for (let quest in DB.templates.quests) {
            ClientDB.templates.quests[quest] = DB.templates.quests[quest];
        }
        //任务本地化文本支持
        CustomLog("正在加载任务数据...");
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
            CustomLog("任务数据加载成功: " + DB.locales["ch"].quest[quests].name);
        }
        CustomLog("正在加载配方数据...");
        for (let recipe in Recipe) {
            ClientDB.hideout.production.push(Recipe[recipe].Data);
            CustomLog("配方数据加载成功: " + Recipe[recipe].Name);
        }
        //Buff写入
        for (let buff in DB.globals) {
            ClientDB.globals.config.Health.Effects.Stimulator.Buffs[buff] = DB.globals[buff];
        }
        //装备修复(旧代码)
        for (let item in ClientDB.templates.items) {
            if (ClientDB.templates.items[item]._props.Slots) {
                for (let slot in ClientDB.templates.items[item]._props.Slots) {
                    for (let filter in ClientDB.templates.items[item]._props.Slots[slot]._props.filters[0].Filter) {
                        if (ClientDB.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] == "5ea17ca01412a1425304d1c0") {
                            ClientDB.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Debug头盔");
                        }
                        if (ClientDB.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] == "5447b5cf4bdc2d65278b4567" && GrenadeTrigger.Trigger == true) {
                            ClientDB.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("54009119af1c881c07000029");
                        }
                    }
                }
            }
        }
        FixEuqipment("外勤公文包", "5d235bb686f77443f4331278");
        //Bot Modifier
        //#region  海关Bosa调整, Bot战利品生成
        //ClientDB.bots.types.bossbully = DB.bots.types.Reshala
        //ClientDB.bots.types.followerbully = DB.bots.types.ReshalaFollower
        AddLoot("高浓缩咖啡方糖", BotScav.inventory.items.Backpack, 25);
        AddLoot("高浓缩咖啡方糖", BotScav.inventory.items.Pockets, 25);
        AddLoot("高浓缩咖啡方糖", BotScav.inventory.items.TacticalVest, 25);
        AddLoot("Vulcan高能量蛋白棒", BotScav.inventory.items.Backpack, 15);
        AddLoot("Vulcan高能量蛋白棒", BotScav.inventory.items.Pockets, 15);
        AddLoot("Vulcan高能量蛋白棒", BotScav.inventory.items.TacticalVest, 15);
        AddLoot("Vulcan便携能量饮料包", BotScav.inventory.items.Backpack, 15);
        AddLoot("Vulcan便携能量饮料包", BotScav.inventory.items.Pockets, 15);
        AddLoot("Vulcan便携能量饮料包", BotScav.inventory.items.TacticalVest, 15);
        AddLoot("Vulcan活力因子激活血清", BotSanitar.inventory.items.Pockets, 15);
        AddLoot("Vulcan活力因子激活血清", BotKnight.inventory.items.Pockets, 15);
        AddLoot("Vulcan活力因子激活血清", BotBigPipe.inventory.items.Pockets, 15);
        AddLoot("Vulcan活力因子激活血清", BotBirdEye.inventory.items.Pockets, 15);
        AddLoot("Vulcan活力因子激活血清", BotGlukhar.inventory.items.Pockets, 15);
        AddLoot("Vulcan活力因子激活血清", BotShturman.inventory.items.Pockets, 15);
        AddLoot("Vulcan活力因子激活血清", BotTagilla.inventory.items.Pockets, 15);
        AddLoot("Vulcan活力因子激活血清", BotKilla.inventory.items.Pockets, 15);
        //AddLoot("Vulcan活力因子激活血清", BotReshala.inventory.items.Pockets, 15)
        AddLoot("Vulcan实验型再生促进血清", BotSanitar.inventory.items.Pockets, 15);
        AddLoot("Vulcan实验型再生促进血清", BotKnight.inventory.items.Pockets, 15);
        AddLoot("Vulcan实验型再生促进血清", BotBigPipe.inventory.items.Pockets, 15);
        AddLoot("Vulcan实验型再生促进血清", BotBirdEye.inventory.items.Pockets, 15);
        AddLoot("Vulcan实验型再生促进血清", BotGlukhar.inventory.items.Pockets, 15);
        AddLoot("Vulcan实验型再生促进血清", BotShturman.inventory.items.Pockets, 15);
        AddLoot("Vulcan实验型再生促进血清", BotTagilla.inventory.items.Pockets, 15);
        AddLoot("Vulcan实验型再生促进血清", BotKilla.inventory.items.Pockets, 15);
        //AddLoot("Vulcan实验型再生促进血清", BotReshala.inventory.items.Pockets, 15)
        //#endregion
        //处理海关Boss生成
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
        //适配370的动态装备调整
        ClientDB.bots.types.bossbully.chances.equipment = DB.bots.types.Reshala.chances.equipment;
        ClientDB.bots.types.bossbully.chances.mods = DB.bots.types.Reshala.chances.mods;
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
        ClientDB.bots.types.followerbully.chances.mods = DB.bots.types.ReshalaFollower.chances.mods;
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
        //CustomAccess(SVCheck) //true
        //CustomAccess(convertVersion(ServerVersion)) //370
        //容器战利品(仍需验证)(已经生效)
        AddStaticLoot("高浓缩咖啡方糖", "59e3577886f774176a362503");
        AddStaticLoot("Vulcan实验型再生促进血清", "544fb3f34bdc2d03748b456a");
        AddStaticLoot("Vulcan细胞活性刺激血清", "5c0e531d86f7747fa23f4d42");
        AddStaticLoot("Vulcan战场紧急手术套组", "5d02778e86f774203e7dedbe");
        AddStaticLoot("Vulcan便携能量饮料包", "60098b1705871270cd5352a1");
        AddStaticLoot("Vulcan高能量蛋白棒", "544fb6cc4bdc2d34748b456e");
        AddMapLoot("白火药", "590c5a7286f7747884343aea");
        AddStaticLoot("白火药", "590c5a7286f7747884343aea");
        AddMapLoot("薇尔莉特火药", "5d6fc78386f77449d825f9dc");
        AddStaticLoot("薇尔莉特火药", "5d6fc78386f77449d825f9dc");
        AddMapLoot("布洛妮娅火药", "5d6fc87386f77449db3db94e");
        AddStaticLoot("布洛妮娅火药", "5d6fc87386f77449db3db94e");
        AddStaticLoot("城管臂带", "60b0f988c4449e4cb624c1da");
        AddStaticLoot("WanderingEarth臂带", "60b0f988c4449e4cb624c1da");
        AddStaticLoot("Trans臂带", "60b0f988c4449e4cb624c1da");
        AddMapLoot("不死图腾", "59faff1d86f7746c51718c9c");
        AddStaticLoot("不死图腾", "59faff1d86f7746c51718c9c");
        AddMapLoot("朱雀", "63a0b208f444d32d6f03ea1e");
        AddStaticLoot("朱雀", "63a0b208f444d32d6f03ea1e");
        AddMapLoot("阿萨兰之爪", "5bc9c049d4351e44f824d360");
        AddStaticLoot("阿萨兰之爪", "5bc9c049d4351e44f824d360");
        //收藏家新内容
        for (let c in DB.templates.QuestCondition) {
            for (var i = 0; i < DB.templates.QuestCondition[c].Conditions.length; i++) {
                ClientDB.templates.quests[c].conditions.AvailableForFinish.push(DB.templates.QuestCondition[c].Conditions[i]);
            }
            for (let l in DB.templates.QuestCondition[c].Locale) {
                Local[l] = DB.templates.QuestCondition[c].Locale[l];
            }
        }
        //商人交易报价
        for (let a in DB.templates.TraderAssort) {
            const TA = DB.templates.TraderAssort[a];
            const ID = TA.Items[0]._id;
            const AssortData = ClientDB.traders[TA.Trader].assort;
            const QuestsData = ClientDB.templates.quests[TA.Quest];
            const TraderData = ClientDB.traders[TA.Trader];
            const Reward = QuestsData.rewards.Success;
            const Name = TA.Name;
            for (var i = 0; i < TA.Items.length; i++) {
                AssortData.items.push(TA.Items[i]);
            }
            AssortData.barter_scheme[ID] = [[]];
            for (let br in TA.Barter) {
                AssortData.barter_scheme[ID][0].push({
                    "count": TA.Barter[br],
                    "_tpl": br
                });
            }
            AssortData.loyal_level_items[ID] = TA.LLR;
            if (TA.isLock == true) {
                TraderData.questassort.success[ID] = TA.Quest;
                Reward.push({
                    "id": `${Name}RW`,
                    "type": "AssortmentUnlock",
                    "index": Reward.length,
                    "target": `${Name}RW1`,
                    "items": [
                        {
                            "_id": `${Name}RW1`,
                            "_tpl": TA.Items[0]._tpl
                        }
                    ],
                    "loyaltyLevel": TA.LLR,
                    "traderId": TA.Trader
                });
            }
            CustomLog(`报价单处理完成: ${TA.Name}`);
        }
        //自定义控制台输出
        function CustomLog(string) {
            Logger.logWithColor("[Console]: " + string, "yellow");
        }
        function CustomLog2(string) {
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
            for (var i = 0; i < num; i++) {
                local.push(id);
            }
        }
        //版本号转换
        function convertVersion(inputString) {
            // 去除字符串中的"."
            var CacheString = removeQuotes(inputString);
            var numberString = CacheString.replace(/\./g, '');
            // 将字符串转化为数字
            var number = parseInt(numberString);
            return number;
        }
        //版本号格式检查
        function versionFormatCheck(string) {
            var CacheString = removeQuotes(string);
            // 检查输入是否符合格式
            if (/^[0-9]\.[0-9]\.[0-9]$/.test(CacheString)) {
                return true;
            }
            else {
                CustomDenied("服务端版本号经过修改，验证失败，部分Mod内容无法正确启用。");
                return false;
            }
        }
        //字符串去引号
        function removeQuotes(str) {
            // 检查字符串是否以引号开始和结束
            if (str.startsWith('"') && str.endsWith('"')) {
                // 去除首尾引号并返回结果
                return str.slice(1, -1);
            }
            else {
                return str; // 字符串不包含引号，直接返回原字符串
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
        function AddLockAssort(trader, id, tpl, price, ll, qid) {
            var AssortData1 = ClientDB.traders[trader].assort;
            var CacheHashID = id;
            AssortData1.items.push({
                "_id": CacheHashID,
                "_tpl": tpl,
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
            ClientDB.traders[trader].questassort.success.CacheHashID = qid;
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
        var Therapist = "54cb57776803fa99248b456e";
        AddAssort("Persicaria", "妖精女仆长的臂带", 20011113, 4);
        AddAssort("5ac3b934156ae10c4430e83c", "小腰包", 1476, 1);
        //FixEuqipment("19C", "5cadf6eeae921500134b2799")
        //AddAssort("Polaris", "19C", 200000, 2)
        //FixEuqipment("龙息榴霰弹", "5ede475339ee016e8c534742")
        //AddAssort("Polaris", "龙息榴霰弹", 20000, 2)
        CustomLog("所有数据加载完毕，欢迎回来，指挥官。");
    }
    postAkiLoad(container) {
        const Logger = container.resolve("WinstonLogger");
        Logger.logWithColor("[Console]: PostAkiLoadingAccess...", "yellow");
        return;
    }
    //添加商人头像
    registerProfileImage(preAkiModLoader, imageRouter) {
        const imageFilepath = `./${preAkiModLoader.getModPath("火神重工-理性重构")}db/avatar`;
        imageRouter.addRoute(baseJson.avatar.replace(".jpg", ""), `${imageFilepath}/Persicaria.jpg`);
        imageRouter.addRoute(NSBase.avatar.replace(".png", ""), `${imageFilepath}/Polaris.png`);
    }
    //商人刷新时间
    setupTraderUpdateTime(traderConfig) {
        const traderRefreshRecord = { traderId: baseJson._id, seconds: 3600 };
        const NSBasetraderRefreshRecord = { traderId: NSBase._id, seconds: 3600 };
        traderConfig.updateTime.push(traderRefreshRecord);
        traderConfig.updateTime.push(NSBasetraderRefreshRecord);
    }
}
module.exports = { mod: new Mod() };
//# sourceMappingURL=mod.js.map