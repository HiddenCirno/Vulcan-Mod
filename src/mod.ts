import { DependencyContainer } from "tsyringe";
import crypto from "crypto";
import { IPostDBLoadMod } from "@spt-aki/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt-aki/servers/DatabaseServer";
import { IPreAkiLoadMod } from "@spt-aki/models/external/IPreAkiLoadMod";
import { IPostAkiLoadMod } from "@spt-aki/models/external/IPostAkiLoadMod";
import type { StaticRouterModService } from "@spt-aki/services/mod/staticRouter/StaticRouterModService";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { ImageRouter } from "@spt-aki/routers/ImageRouter";
import { ConfigServer } from "@spt-aki/servers/ConfigServer";
import { ConfigTypes } from "@spt-aki/models/enums/ConfigTypes";
import { ITraderConfig, UpdateTime } from "@spt-aki/models/spt/config/ITraderConfig";
import { IModLoader } from "@spt-aki/models/spt/mod/IModLoader";
import { JsonUtil } from "@spt-aki/utils/JsonUtil";
import { VFS } from "@spt-aki/utils/VFS"
import { Traders } from "@spt-aki/models/enums/Traders";
import { ProfileHelper } from "@spt-aki/helpers/ProfileHelper";
import { LauncherCallbacks } from "@spt-aki/callbacks/LauncherCallbacks";
import { PreAkiModLoader } from "@spt-aki/loaders/PreAkiModLoader";
import { ImporterUtil } from "@spt-aki/utils/ImporterUtil"
//import { VulcanConsole } from "../../[火神之心]VulcanCore/src/vulcan-api/console";
//import { VulcanItemEditor } from "../../[火神之心]VulcanCore/src/vulcan-api/itemedit";
//import { VulcanLocaleHelper } from "../../[火神之心]VulcanCore/src/vulcan-api/localehelper";
//import { VulcanHandBookHelper } from "../../[火神之心]VulcanCore/src/vulcan-api/handbook";
//import { VulcanQuestHelper } from "../../[火神之心]VulcanCore/src/vulcan-api/questhelper";
//import { VulcanTraderHelper } from "../../[火神之心]VulcanCore/src/vulcan-api/traderhelper";
//import { VulcanDatabaseHelper } from "../../[火神之心]VulcanCore/src/vulcan-api/dbhelper";
import { ITraderAssort, ITraderBase } from "@spt-aki/models/eft/common/tables/ITrader";
//import { ITraderConfig, UpdateTime } from "@spt-aki/models/spt/config/ITraderConfig";
//
import * as baseJson from "../db/traders/Persicaria/base.json";
import * as NSBase from "../db/traders/Polaris/base.json";
//
class Mod implements IPreAkiLoadMod, IPostAkiLoadMod, IPostDBLoadMod {
    
    Traders["Persiciria"] = "Persiciria";
    public preAkiLoad(container: DependencyContainer): void {
        const Logger = container.resolve<ILogger>("WinstonLogger");
        const PreAkiModLoader = container.resolve("PreAkiModLoader");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const FuncDatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const FuncImporterUtil = container.resolve<ImporterUtil>("ImporterUtil")
        const staticRouterModService = container.resolve<StaticRouterModService>("StaticRouterModService");
        const traderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const ModPath = PreAkiModLoader.getModPath("火神重工-重启")
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`)
        const ClientDB = FuncDatabaseServer.getTables();
        const imageRouter = container.resolve<ImageRouter>("ImageRouter");
        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        Logger.logWithColor("[Console]: PreAkiLoadingAccess...", "yellow")
        this.setupTraderUpdateTime(traderConfig);
        this.registerProfileImage(PreAkiModLoader, imageRouter);
        Traders[baseJson._id] = baseJson._id;
    }
    public postDBLoad(container: DependencyContainer): void {
        const Logger = container.resolve<ILogger>("WinstonLogger");
        const PreAkiModLoader = container.resolve("PreAkiModLoader");
        const FuncDatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const FuncImporterUtil = container.resolve<ImporterUtil>("ImporterUtil")
        const imageRouter = container.resolve<ImageRouter>("ImageRouter");
        const launcherCallbacks = container.resolve<LauncherCallbacks>("LauncherCallbacks");
        const VFS = container.resolve<VFS>("VFS");
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        //const cs = container.resolve<VulcanConsole>("VulcanConsole")
        //const itemEditor = container.resolve<VulcanItemEditor>("VulcanItemEditor")
        //const localeHelper = container.resolve<VulcanLocaleHelper>("VulcanLocaleHelper")
        //const handbookHelper = container.resolve<VulcanHandBookHelper>("VulcanHandBookHelper")
        //const questHelper = container.resolve<VulcanQuestHelper>("VulcanQuestHelper")
        //const traderHelper = container.resolve<VulcanTraderHelper>("VulcanTraderHelper")
        //const dbHelper = container.resolve<VulcanDatabaseHelper>("VulcanDatabaseHelper")
        const ClientDB = FuncDatabaseServer.getTables();
        const ClientQuest = ClientDB.templates.quests
        const ClientItem = ClientDB.templates.items
        const ClientHideout = ClientDB.hideout.areas
        const ModPath = PreAkiModLoader.getModPath("火神重工-重启")
        const imageFilepath = `./${ModPath}db/avatar/`;
        const iconPath = `${ModPath}images/quests/`
        const iconList = VFS.getFiles(iconPath);
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`)
        const Recipe = FuncImporterUtil.loadRecursive(`${ModPath}Recipe/`)
        const Hideout = FuncImporterUtil.loadRecursive(`${ModPath}Hideout/`)
        const ServerVersion = launcherCallbacks.getServerVersion()
        //const SVCheck = versionFormatCheck(ServerVersion)
        const ReshalaChance = 40
        const Config = JsonUtil.deserialize(VFS.readFile(`${ModPath}config.json`));
        const BotScav = ClientDB.bots.types.assault
        const BotReshala = ClientDB.bots.types.bossbully
        const BotSanitar = ClientDB.bots.types.bosssanitar
        const BotKnight = ClientDB.bots.types.bossknight
        const BotGlukhar = ClientDB.bots.types.bossgluhar
        const BotShturman = ClientDB.bots.types.bosskojaniy
        const BotKilla = ClientDB.bots.types.bosskilla
        const BotTagilla = ClientDB.bots.types.bosstagilla
        const BotBigPipe = ClientDB.bots.types.followerbigpipe
        const BotBirdEye = ClientDB.bots.types.followerbirdeye
        const GrenadeTrigger = { "Trigger": false }
        const Pack = JsonUtil.deserialize(VFS.readFile(`${ModPath}package.json`));
        const version = Pack.version
        const ModName = Pack.name;
        //CustomAccess(launcherCallbacks.getServerVersion())
        //商人添加
        for (let trader in DB.traders) {
            ClientDB.traders[trader] = DB.traders[trader]
            var TraderBase = DB.traders[trader].base
            var TraderID = TraderBase._id
            ClientDB.locales.global["ch"][TraderID + " FullName"] = TraderBase.surname
            ClientDB.locales.global["ch"][TraderID + " FirstName"] = TraderBase.name
            ClientDB.locales.global["ch"][TraderID + " Nickname"] = TraderBase.nickname
            ClientDB.locales.global["ch"][TraderID + " Location"] = TraderBase.location
            ClientDB.locales.global["ch"][TraderID + " Description"] = TraderBase.description
        }
        //任务奖励添加
        for (let rw in DB.templates.QuestReward) {
            addQuestReward(DB.templates.QuestReward[rw].questid, DB.templates.QuestReward[rw].rewarddata)
        }
        const AllItems = ClientDB.templates.items;
        Logger.logWithColor("[Console]: PostDataBaseLoadingAccess...", "yellow")
        CustomLog("心智云图已连接，正在加载数据……")
        //物品写入
        CustomLog("正在加载物品数据...")
        //dbHelper.loadItem(DB.templates.items)

        for (let item in DB.templates.items) {
            var Local = ClientDB.locales.global["ch"]
            var ItemData = DB.templates.items[item]
            ClientDB.templates.items[item] = DB.templates.items[item]
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
        const 公文包 = ClientDB.templates.items["外勤公文包"]._props.Grids[0]._props.filters[0].Filter
        //#region 公文包容纳类型修复
        AddItemWithRagfairTag("5b47574386f77428ca22b2f1", 公文包) //贵重物品
        AddItemWithRagfairTag("5b47574386f77428ca22b337", 公文包) //药丸
        AddItemWithRagfairTag("5b47574386f77428ca22b33a", 公文包) //注射器
        AddItemWithRagfairTag("5b47574386f77428ca22b33b", 公文包) //子弹
        AddItemWithRagfairTag("5b47574386f77428ca22b341", 公文包) //情报物品
        AddItemWithRagfairTag("5b47574386f77428ca22b345", 公文包) //特殊装备
        AddItemWithRagfairTag("5b5f78b786f77447ed5636af", 公文包) //钱 
        AddItemWithRagfairTag("5c518ec986f7743b68682ce2", 公文包) //机械钥匙
        AddItemWithRagfairTag("5c518ed586f774119a772aee", 公文包) //电子钥匙
        AddItemWithRagfairTag("5b47574386f77428ca22b339", 公文包) //创伤治疗
        AddItemWithRagfairTag("5b47574386f77428ca22b336", 公文包) //食品
        AddItemWithRagfairTag("5b47574386f77428ca22b335", 公文包) //饮品
        公文包.push("59f32bb586f774757e1e8442") //Bear狗牌
        公文包.push("59f32c3b86f77472a31742f0") //Usec狗牌
        公文包.push("阿萨兰之爪") //阿萨兰之爪
        公文包.push("5bc9c049d4351e44f824d360") //古董书
        公文包.push("5c0fa877d174af02a012e1cf") //滤嘴水壶 
        公文包.push("59fafd4b86f7745ca07e1232") //钥匙收纳器
        公文包.push("62a09d3bcf4a99369e262447") //钥匙扣
        公文包.push("5783c43d2459774bbe137486") //钱包
        公文包.push("60b0f6c058e0b0481a09ad11") //WZ钱包
        公文包.push("619cbf9e0a7c3a1a2731940a") //钥匙卡收纳盒
        //#endregion
        //私货
        for (let item in ClientDB.templates.items) {
            if (Config.FireworkGrenade == true) {
                ClientDB.templates.items[item]._props.FragmentsCount = 0
                ClientDB.templates.items[item]._props.Strength = 0
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
        ]
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
        ]
        //太阳能需求修改
        for (var i = 0; i < ClientHideout.length; i++) {
            if (ClientHideout[i].type == 18) {
                ClientHideout[i].stages["1"].requirements = solareq
                ClientHideout[i].stages["1"].constructionTime = 604800
                ClientHideout[i].stages["1"].bonuses[0].value = -100
            }
            if (ClientHideout[i].type == 20) {
                ClientHideout[i].stages["3"].requirements = btc3
            }
        }
        //AddLockAssort("5a7c2eca46aef81a7ca2145d", "变压器", "6389c85357baa773a825b356", 9000000, 4, "太阳能维修")
        //钥匙耐久
        var key25 = [
            "63a3a93f8a56922e82001f5d",//废弃工厂符号钥匙
            "5780cf7f2459777de4559322",//符号钥匙
            "62987dfc402c7f69bf010923",//套间符号钥匙
            "64ccc25f95763a1ae376e447",//神秘房间符号钥匙
            "5d80c62a86f7744036212b3f",//RB-VO
            "5d80c60f86f77440373c4ece",//RB-BK
            "5ede7a8229445733cb4c18e2" //RB-PKPM
        ]
        var key40 = [
            "5448ba0b4bdc2d02308b456c",//工厂钥匙
            "63a39fc0af870e651d58e6ae",//15公寓钥匙
            "6582dbf0b8d7830efc45016f"//休息室钥匙
        ]
        var key1 = [
            "5d08d21286f774736e7c94c3",//Shturman钥匙
            "64d4b23dc1b37504b41ac2b6"//血腥钥匙
        ]
        for (let it in ClientDB.templates.items) {
            if (ClientDB.templates.items[it]._parent == "5c99f98d86f7745c314214b3") {
                ClientDB.templates.items[it]._props.MaximumNumberOfUsage = 100
                for (var i = 0; i < key25.length; i++) {
                    if (ClientDB.templates.items[it]._id == key25[i]) {
                        ClientDB.templates.items[it]._props.MaximumNumberOfUsage = 25
                    }
                }
                for (var j = 0; j < key40.length; j++) {
                    if (ClientDB.templates.items[it]._id == key40[j]) {
                        ClientDB.templates.items[it]._props.MaximumNumberOfUsage = 50
                    }
                }
                for (var k = 0; k < key1.length; k++) {
                    if (ClientDB.templates.items[it]._id == key1[k]) {
                        ClientDB.templates.items[it]._props.MaximumNumberOfUsage = 1
                    }
                }
            }
        }
        //邮箱本地化文本处理
        for (let mails in DB.locales["ch"].mail) {
            ClientDB.locales.global["ch"][mails] = DB.locales["ch"].mail[mails]
        }
        for (let mails in DB.locales["ch"].nsmail) {
            ClientDB.locales.global["ch"][mails] = DB.locales["ch"].nsmail[mails]
        }
        /*
        //原版任务修改
        var sectantarr = [] //夜间扫荡
        ClientQuest["5c0be13186f7746f016734aa"].conditions.AvailableForFinish[0].value = 15 //狙击疯魔
        ClientQuest["60e71c11d54b755a3b53eb65"].conditions.AvailableForFinish[0].index = 2 //夜间扫荡
        ClientQuest["60e71c11d54b755a3b53eb65"].conditions.AvailableForFinish[1].index = 3
        sectantarr.push(
            {
                "_parent": "CounterCreator",
                    "counter": {
                        "id": "夜间扫荡祭祀击杀目标指示",
                        "conditions": [
                            {
                                    "target": "Savage",
                                    "savageRole": [
                                        "sectantPriest"
                                    ],
                                    "id": "夜间扫荡祭祀击杀目标",
                                    "dynamicLocale": false,
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
                    "visibilityConditions": [],
                "dynamicLocale": false
            }
        )
        sectantarr.push(
            {
                "_parent": "CounterCreator",
                    "counter": {
                        "id": "夜间扫荡战士击杀目标指示",
                        "conditions": [
                            {
                                    "target": "Savage",
                                    "savageRole": [
                                        "sectantWarrior"
                                    ],
                                    "id": "夜间扫荡战士击杀目标",
                                    "dynamicLocale": false,
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
                    "visibilityConditions": [],
                "dynamicLocale": false
            }
        )
        sectantarr.push(ClientQuest["60e71c11d54b755a3b53eb65"].conditions.AvailableForFinish[0])
        sectantarr.push(ClientQuest["60e71c11d54b755a3b53eb65"].conditions.AvailableForFinish[1])
        ClientQuest["60e71c11d54b755a3b53eb65"].conditions.AvailableForFinish = sectantarr
        ClientQuest["5d6fbc2886f77449d825f9d3"].rewards.Success[0].value = 500 //导师
        ClientQuest["60e71d23c1bfa3050473b8e6"].rewards.Success[1].value = 500 //致命校准
        ClientQuest["60e71d23c1bfa3050473b8e6"].rewards.Success[1].target = "Sniper" //致命校准
        */
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
        ]
        ClientItem["6499849fc93611967b034949"]._props.Slots[5]._props.filters[0].Filter.push("59ecc28286f7746d7a68aa8c")//锁扣
        for (var i = 0; i < muzzlearr.length; i++) {//枪口
            ClientItem["6499849fc93611967b034949"]._props.Slots[2]._props.filters[0].Filter.push(muzzlearr[i])
        }
        ClientItem["6499849fc93611967b034949"]._props.bFirerate = 650
        ClientItem["6499849fc93611967b034949"]._props.RecoilForceUp = 83
        ClientItem["6499849fc93611967b034949"]._props.RecoilForceBack = 272
        ClientItem["6499849fc93611967b034949"]._props.Slots[4]._props.filters[0].Filter.push("5d2c770c48f0354b4a07c100")//机匣盖
        ClientItem["6499849fc93611967b034949"]._props.Slots[4]._props.filters[0].Filter.push("5d2c76ed48f03532f2136169")
        //*/
        //服装生成
        CustomLog("正在加载服装数据...")
        for (let ct in DB.templates.custom) {
            var Local = ClientDB.locales.global["ch"]
            ClientDB.templates.customization[ct] = DB.templates.custom[ct]
            Local[ClientDB.templates.customization[ct]._id + " Name"] = ClientDB.templates.customization[ct]._props.Name
            Local[ClientDB.templates.customization[ct]._id + " ShortName"] = ClientDB.templates.customization[ct]._props.ShortName
            Local[ClientDB.templates.customization[ct]._id + " Description"] = ClientDB.templates.customization[ct]._props.Description
            CustomLog("服装数据加载成功: " + Local[ClientDB.templates.customization[ct]._id + " Name"])
        }
        //CustomLog("正在加载声线数据...")
        //声线读取, 修改
        //#region
        for (let ct in ClientDB.templates.customization) {
            var Custom = ClientDB.templates.customization[ct]
            var NameObj = ClientDB.templates.customization[ct]._props.Name
            var Name = JSON.stringify(ClientDB.templates.customization[ct]._props.Name, null)
            var VoiceKilla = "6353fea0a644ca0c510d1dd8"
            var VoiceTagilla = "6353fec227f75f803206e60a"
            var VoiceReshala = "5fc615460b735e7b024c76eb"
            var VoiceSanitar = "5fc615710b735e7b024c76ed"
            var VoiceGlukhar = "5fc6155b0b735e7b024c76ec"
            var VoiceKnight = "6353fe74a644ca0c510d1dd6"
            var VoiceBigPipe = "6353fe04f0de2294830a0dbe"
            var VoiceBirdEye = "6353fe34f0de2294830a0dbf"
            var ID = ClientDB.templates.customization[ct]._id
            if (typeof (Name) == 'string') {
                //CustomLog(typeof(Name))
                var Boss = Name.substring(1, 5);
                var Scav = Name.substring(1, 5);
                var Props = Custom._props
                const Local = ClientDB.locales.global["ch"]
                const LocalEng = ClientDB.locales.global["en"]
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
                    CustomLog("声线数据加载成功: " + Local[Custom._id + " Name"])
                    //CustomLog(NameObj)
                    //CustomLog(Local[Custom._id + " Name"] = NameObj)

                    if (Scav == "Scav") {
                        //CustomLog(Name)
                        Custom._props.Side.push("Bear")
                        Custom._props.Side.push("Usec")
                        switch (NameObj) {
                            case "Scav_1": NameObj = "Scav-1";
                                break;
                            case "Scav_2": NameObj = "Scav-2";
                                break;
                            case "Scav_3": NameObj = "Scav-3";
                                break;
                            case "Scav_4": NameObj = "Scav-4";
                                break;
                            case "Scav_5": NameObj = "Scav-5";
                                break;
                            case "Scav_6": NameObj = "Scav-6";
                                break;
                        }
                        Local[Custom._id + " Name"] = NameObj
                        LocalEng[Custom._id + " Name"] = NameObj
                        CustomLog("声线数据加载成功: " + Local[Custom._id + " Name"])
                    }
                }
            }

        }
        //#endregion
        //任务图片添加
        for (const icon of iconList) {
            const filename = VFS.stripExtension(icon);
            imageRouter.addRoute(`/files/quest/icon/${filename}`, `${iconPath}${icon}`);
        }
        //任务写入
        for (let quest in DB.templates.quests) {
            ClientDB.templates.quests[quest] = DB.templates.quests[quest]
        }
        //任务本地化文本支持
        CustomLog("正在加载任务数据...")
        for (let quests in DB.locales["ch"].quest) {
            ClientDB.locales.global["ch"][quests + " name"] = DB.locales["ch"].quest[quests].name
            ClientDB.locales.global["ch"][quests + " description"] = DB.locales["ch"].mail[DB.locales["ch"].quest[quests].startedMessageText]
            ClientDB.locales.global["ch"][quests + " failMessageText"] = DB.locales["ch"].mail[DB.locales["ch"].quest[quests].failMessageText]
            ClientDB.locales.global["ch"][quests + " successMessageText"] = DB.locales["ch"].mail[DB.locales["ch"].quest[quests].successMessageText]
            ClientDB.locales.global["ch"][quests + " startedMessageText"] = DB.locales["ch"].mail[DB.locales["ch"].quest[quests].startedMessageText]
            for (let cd in DB.locales["ch"].quest[quests].conditions) {
                ClientDB.locales.global["ch"][cd] = DB.locales["ch"].quest[quests].conditions[cd]
            }

            //ClientDB.locales.global["en"].quest[quests] = DB.locales["ch"].quest[quests]
            //ClientDB.locales.global["ru"].quest[quests] = DB.locales["ch"].quest[quests]
            CustomLog("任务数据加载成功: " + DB.locales["ch"].quest[quests].name)
        }
        CustomLog("正在加载配方数据...");
        for (let recipe in Recipe) {
            ClientDB.hideout.production.push(Recipe[recipe].Data);
            CustomLog("配方数据加载成功: " + Recipe[recipe].Name);
        }
        //Buff写入
        for (let buff in DB.globals) {
            ClientDB.globals.config.Health.Effects.Stimulator.Buffs[buff] = DB.globals[buff]
        }
        //装备修复(旧代码)
        for (let item in ClientDB.templates.items) {
            if (ClientDB.templates.items[item]._props.Slots) {
                for (let slot in ClientDB.templates.items[item]._props.Slots) {
                    for (let filter in ClientDB.templates.items[item]._props.Slots[slot]._props.filters[0].Filter) {
                        if (ClientDB.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] == "5ea17ca01412a1425304d1c0") {
                            ClientDB.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("Debug头盔")
                        }
                        if (ClientDB.templates.items[item]._props.Slots[slot]._props.filters[0].Filter[filter] == "5447b5cf4bdc2d65278b4567" && GrenadeTrigger.Trigger == true) {
                            ClientDB.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push("54009119af1c881c07000029")
                        }

                    }
                }
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
                    } else {
                        copy[key] = convertQuest(obj[key]);
                    }
                }
            }

            return copy;
        }
        function questFileFix(obj) {
            for (let a in obj) {
                const A = obj[a].conditions.AvailableForStart
                const B = obj[a].conditions.AvailableForFinish
                const C = obj[a].conditions.Fail
                if(B.length>0){
                    for (var b = 0; b < B.length; b++){
                        B[b].isEncoded = false;
                        B[b].countInRaid = false;
                        B[b].globalQuestCounterId = "";
                    }
                }
                if(A.length>0){
                    for (var b = 0; b < A.length; b++){
                        A[b].globalQuestCounterId = "";
                    }
                }
                obj[a].conditions.AvailableForFinish = convertQuest(obj[a].conditions.AvailableForFinish)
            }
            return obj
        }
        function questCondFix(obj) {
            for (var i = 0; i < obj.length; i++) {
                const B = obj[i]
                        B.isEncoded = false;
                        B.countInRaid = false;
                        B.globalQuestCounterId = "";
                obj[i] = convertQuest(obj[i])
            }
            return obj
        }
        ClientDB.locations.tarkovstreets.looseLoot.spawnpointsForced = []
        //ClientDB.locations.tarkovstreets.looseLoot.spawnpoints = []
        ClientDB.locations.tarkovstreets.looseLoot.spawnpointsForced.push(DB.templates.itemspawn.Forced[0])
        CustomLog("开始执行任务文件转换")
        var newquest = questFileFix(convertQuest(DB.quests))
        var newcondi = questCondFix(DB.templates.QuestCondition["5c51aac186f77432ea65c552"].Conditions)
        VFS.writeFile(`${ModPath}newquest.json`, JSON.stringify(newquest, null, 4))
        VFS.writeFile(`${ModPath}newcondi.json`, JSON.stringify(newcondi, null, 4))
        CustomLog("任务文件转换完成！")
        FixEuqipment("外勤公文包", "5d235bb686f77443f4331278")
        //Bot Modifier
        //#region  海关Bosa调整, Bot战利品生成
        //ClientDB.bots.types.bossbully = DB.bots.types.Reshala
        //ClientDB.bots.types.followerbully = DB.bots.types.ReshalaFollower
        AddLoot("高浓缩咖啡方糖", BotScav.inventory.items.Backpack, 25)
        AddLoot("高浓缩咖啡方糖", BotScav.inventory.items.Pockets, 25)
        AddLoot("高浓缩咖啡方糖", BotScav.inventory.items.TacticalVest, 25)
        AddLoot("Vulcan高能量蛋白棒", BotScav.inventory.items.Backpack, 15)
        AddLoot("Vulcan高能量蛋白棒", BotScav.inventory.items.Pockets, 15)
        AddLoot("Vulcan高能量蛋白棒", BotScav.inventory.items.TacticalVest, 15)
        AddLoot("Vulcan便携能量饮料包", BotScav.inventory.items.Backpack, 15)
        AddLoot("Vulcan便携能量饮料包", BotScav.inventory.items.Pockets, 15)
        AddLoot("Vulcan便携能量饮料包", BotScav.inventory.items.TacticalVest, 15)
        AddLoot("Vulcan活力因子激活血清", BotSanitar.inventory.items.Pockets, 15)
        AddLoot("Vulcan活力因子激活血清", BotKnight.inventory.items.Pockets, 15)
        AddLoot("Vulcan活力因子激活血清", BotBigPipe.inventory.items.Pockets, 15)
        AddLoot("Vulcan活力因子激活血清", BotBirdEye.inventory.items.Pockets, 15)
        AddLoot("Vulcan活力因子激活血清", BotGlukhar.inventory.items.Pockets, 15)
        AddLoot("Vulcan活力因子激活血清", BotShturman.inventory.items.Pockets, 15)
        AddLoot("Vulcan活力因子激活血清", BotTagilla.inventory.items.Pockets, 15)
        AddLoot("Vulcan活力因子激活血清", BotKilla.inventory.items.Pockets, 15)
        //AddLoot("Vulcan活力因子激活血清", BotReshala.inventory.items.Pockets, 15)
        AddLoot("Vulcan实验型再生促进血清", BotSanitar.inventory.items.Pockets, 15)
        AddLoot("Vulcan实验型再生促进血清", BotKnight.inventory.items.Pockets, 15)
        AddLoot("Vulcan实验型再生促进血清", BotBigPipe.inventory.items.Pockets, 15)
        AddLoot("Vulcan实验型再生促进血清", BotBirdEye.inventory.items.Pockets, 15)
        AddLoot("Vulcan实验型再生促进血清", BotGlukhar.inventory.items.Pockets, 15)
        AddLoot("Vulcan实验型再生促进血清", BotShturman.inventory.items.Pockets, 15)
        AddLoot("Vulcan实验型再生促进血清", BotTagilla.inventory.items.Pockets, 15)
        AddLoot("Vulcan实验型再生促进血清", BotKilla.inventory.items.Pockets, 15)
        //AddLoot("Vulcan实验型再生促进血清", BotReshala.inventory.items.Pockets, 15)
        //#endregion
        //处理海关Boss生成
        for (var i = 0; i < ClientDB.locations["bigmap"].base.BossLocationSpawn.length; i++) {
            const BossSpawn = ClientDB.locations["bigmap"].base.BossLocationSpawn
            if (BossSpawn[i].BossName == "bossBully") {
                BossSpawn[i].BossChance = ReshalaChance
                //CustomLog(BossSpawn[i].BossEscortAmount)
                //BossSpawn[i].BossEscortAmount = 2
                //CustomLog(BossSpawn[i].BossEscortAmount)
                //BossSpawn[i].BossZone = "ZoneCustoms"
            }
        }
        //适配380的动态装备调整
        ClientDB.bots.types.bossbully.chances.equipment = DB.bots.types.Reshala.chances.equipment
        ClientDB.bots.types.bossbully.chances.weaponMods = DB.bots.types.Reshala.chances.weaponMods
        ClientDB.bots.types.bossbully.chances.equipmentMods = DB.bots.types.Reshala.chances.equipmentMods
        ClientDB.bots.types.bossbully.experience.reward = DB.bots.types.Reshala.experience.reward
        ClientDB.bots.types.bossbully.health = DB.bots.types.Reshala.health
        ClientDB.bots.types.bossbully.inventory = DB.bots.types.Reshala.inventory
        ClientDB.bots.types.bossbully.skills = DB.bots.types.Reshala.skills
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
        }
        ClientDB.bots.types.followerbully.chances.equipment = DB.bots.types.ReshalaFollower.chances.equipment
        ClientDB.bots.types.followerbully.chances.weaponMods = DB.bots.types.ReshalaFollower.chances.weaponMods
        ClientDB.bots.types.followerbully.chances.equipmentMods = DB.bots.types.ReshalaFollower.chances.equipmentMods
        ClientDB.bots.types.followerbully.experience.reward = DB.bots.types.ReshalaFollower.experience.reward
        ClientDB.bots.types.followerbully.health = DB.bots.types.ReshalaFollower.health
        ClientDB.bots.types.followerbully.inventory = DB.bots.types.ReshalaFollower.inventory
        ClientDB.bots.types.followerbully.skills = DB.bots.types.ReshalaFollower.skills
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
        }
        //CustomAccess(SVCheck) //true
        //CustomAccess(convertVersion(ServerVersion)) //380

        //容器战利品(仍需验证)(已经生效)
        AddStaticLoot("高浓缩咖啡方糖", "59e3577886f774176a362503")
        AddStaticLoot("Vulcan实验型再生促进血清", "544fb3f34bdc2d03748b456a")
        AddStaticLoot("Vulcan细胞活性刺激血清", "5c0e531d86f7747fa23f4d42")
        AddStaticLoot("Vulcan战场紧急手术套组", "5d02778e86f774203e7dedbe")
        AddStaticLoot("Vulcan便携能量饮料包", "60098b1705871270cd5352a1")
        AddStaticLoot("Vulcan高能量蛋白棒", "544fb6cc4bdc2d34748b456e")
        AddMapLoot("白火药", "590c5a7286f7747884343aea")
        AddStaticLoot("白火药", "590c5a7286f7747884343aea")
        AddMapLoot("薇尔莉特火药", "5d6fc78386f77449d825f9dc")
        AddStaticLoot("薇尔莉特火药", "5d6fc78386f77449d825f9dc")
        AddMapLoot("布洛妮娅火药", "5d6fc87386f77449db3db94e")
        AddStaticLoot("布洛妮娅火药", "5d6fc87386f77449db3db94e")
        AddStaticLoot("城管臂带", "60b0f988c4449e4cb624c1da")
        AddStaticLoot("WanderingEarth臂带", "60b0f988c4449e4cb624c1da")
        AddStaticLoot("Trans臂带", "60b0f988c4449e4cb624c1da")
        AddMapLoot("不死图腾", "59faff1d86f7746c51718c9c")
        AddStaticLoot("不死图腾", "59faff1d86f7746c51718c9c")
        AddMapLoot("朱雀", "63a0b208f444d32d6f03ea1e")
        AddStaticLoot("朱雀", "63a0b208f444d32d6f03ea1e")
        AddMapLoot("阿萨兰之爪", "5bc9c049d4351e44f824d360")
        AddStaticLoot("阿萨兰之爪", "5bc9c049d4351e44f824d360")
        //收藏家新内容
        for (let c in DB.templates.QuestCondition) {
            for (var i = 0; i < DB.templates.QuestCondition[c].Conditions.length; i++) {
                ClientDB.templates.quests[c].conditions.AvailableForFinish.push(DB.templates.QuestCondition[c].Conditions[i])
            }
            for (let l in DB.templates.QuestCondition[c].Locale) {
                Local[l] = DB.templates.QuestCondition[c].Locale[l]
            }
        }
        //商人交易报价
        /*
        for (let a in DB.templates.TraderAssort) {
            const TA = DB.templates.TraderAssort[a]
            const ID = TA.Items[0]._id
            const AssortData = ClientDB.traders[TA.Trader].assort
            const QuestsData = ClientDB.templates.quests[TA.Quest]
            const TraderData = ClientDB.traders[TA.Trader]
            const Reward = QuestsData.rewards.Success
            const Name = TA.Name
            for (var i = 0; i < TA.Items.length; i++) {
                AssortData.items.push(TA.Items[i])
            }
            AssortData.barter_scheme[ID] = [[]]
            for (let br in TA.Barter) {
                AssortData.barter_scheme[ID][0].push({
                    "count": TA.Barter[br],
                    "_tpl": br
                })
            }
            AssortData.loyal_level_items[ID] = TA.LLR
            if (TA.isLock == true) {
                TraderData.questassort.success[ID] = TA.Quest
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
                })
            }
            CustomLog(`报价单处理完成: ${TA.Name}`)
        }
        */
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
                var LootArr = ClientDB.loot.staticLoot[loot].itemDistribution
                for (var i = 0; i < LootArr.length; i++) {
                    if (LootArr[i].tpl == target) {
                        LootArr.push({
                            "tpl": id,
                            "relativeProbability": LootArr[i].relativeProbability
                        })
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
                                var ID = GenerateHash(id)
                                var relative = ClientDB.locations[map].looseLoot.spawnpoints[i].itemDistribution.find(item => item.composedKey.key == ClientDB.locations[map].looseLoot.spawnpoints[i].template.Items[j]._id).relativeProbability
                                //CustomAccess(relative)
                                ClientDB.locations[map].looseLoot.spawnpoints[i].template.Items.push({
                                    "_id": ID,
                                    "_tpl": id

                                })
                                ClientDB.locations[map].looseLoot.spawnpoints[i].itemDistribution.push({
                                    "composedKey": {
                                        "key": ID
                                    },
                                    "relativeProbability": relative
                                }
                                )
                            }
                        }
                    }
                }
            }
        }
        function AddLoot(id, local, num) {
            for (var i = 0; i < num; i++) {
                local.push(id)
            }
        }
        //版本号转换
        function convertVersion(inputString) {
            // 去除字符串中的"."
            var CacheString = removeQuotes(inputString)
            var numberString = CacheString.replace(/\./g, '');

            // 将字符串转化为数字
            var number = parseInt(numberString);

            return number;
        }
        //版本号格式检查
        function versionFormatCheck(string) {
            var CacheString = removeQuotes(string)
            // 检查输入是否符合格式
            if (/^[0-9]\.[0-9]\.[0-9]$/.test(CacheString)) {
                return true;
            }
            else {
                CustomDenied("服务端版本号经过修改，验证失败，部分Mod内容无法正确启用。");
                return false
            }

        }
        //字符串去引号
        function removeQuotes(str) {
            // 检查字符串是否以引号开始和结束
            if (str.startsWith('"') && str.endsWith('"')) {
                // 去除首尾引号并返回结果
                return str.slice(1, -1);
            } else {
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
                                ClientDB.templates.items[item]._props.Slots[slot]._props.filters[0].Filter.push(id)
                            }
                        }
                    }
                }
                if (ClientDB.templates.items[item]._props.Grids) {
                    for (var i = 0; i < ClientDB.templates.items[item]._props.Grids.length; i++) {
                        for (var j = 0; j < ClientDB.templates.items[item]._props.Grids[i]._props.filters.length; j++) {
                            for (var k = 0; k < ClientDB.templates.items[item]._props.Grids[i]._props.filters[j].Filter.length; k++) {
                                if (ClientDB.templates.items[item]._props.Grids[i]._props.filters[j].Filter[k] == target) {
                                    ClientDB.templates.items[item]._props.Grids[i]._props.filters[j].Filter.push(id)
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
                                    ClientDB.templates.items[item]._props.Cartridges[i]._props.filters[j].Filter.push(id)
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
                                    ClientDB.templates.items[item]._props.Chambers[i]._props.filters[j].Filter.push(id)
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
                var ItemData = ClientDB.templates.handbook.Items[i]
                if (ItemData.ParentId == Tag) {
                    if (ClientItem[ItemData.Id]._props.Width * ClientItem[ItemData.Id]._props.Height <= 1) {
                        Filter.push(ItemData.Id)
                    }
                }
            }
        }
        function GenerateHash(string) {
            const shasum = crypto.createHash("sha1");
            shasum.update(string);
            return shasum.digest("hex").substring(0, 24);
        }
        function AddAssort(trader, id, price, ll) {
            var AssortData1 = ClientDB.traders[trader].assort
            var CacheHashID = GenerateHash(id)
            AssortData1.items.push({
                "_id": CacheHashID,
                "_tpl": id,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "StackObjectsCount": 99999,
                    "UnlimitedCount": true
                }
            })
            AssortData1.barter_scheme[CacheHashID] = [[{
                count: price,
                _tpl: '5449016a4bdc2d6f028b456f'
            }]]
            AssortData1.loyal_level_items[CacheHashID] = ll
        }
        function AddLockAssort(trader, id, tpl, price, ll, qid) {
            var AssortData1 = ClientDB.traders[trader].assort
            var CacheHashID = id
            AssortData1.items.push({
                "_id": CacheHashID,
                "_tpl": tpl,
                "parentId": "hideout",
                "slotId": "hideout",
                "upd": {
                    "StackObjectsCount": 99999,
                    "UnlimitedCount": true
                }
            })
            AssortData1.barter_scheme[CacheHashID] = [[{
                count: price,
                _tpl: '5449016a4bdc2d6f028b456f'
            }]]
            AssortData1.loyal_level_items[CacheHashID] = ll
            ClientDB.traders[trader].questassort.success.CacheHashID = qid
        }
        function addQuestReward(questid, reward) {
            if (ClientQuest[questid] != null) {
                const Quest = ClientQuest[questid]
                const Reward = Quest.rewards.Success
                var RewardCache = reward
                RewardCache.index = Reward.length
                Reward.push(reward)
            }
        }
        var Therapist = "54cb57776803fa99248b456e"
        AddAssort("Persicaria", "妖精女仆长的臂带", 20011113, 4)
        AddAssort("5ac3b934156ae10c4430e83c", "小腰包", 1476, 1)
        //FixEuqipment("19C", "5cadf6eeae921500134b2799")
        //AddAssort("Polaris", "19C", 200000, 2)
        //FixEuqipment("龙息榴霰弹", "5ede475339ee016e8c534742")
        //AddAssort("Polaris", "龙息榴霰弹", 20000, 2)
        CustomLog("所有数据加载完毕，欢迎回来，指挥官。")
    }
    public postAkiLoad(container: DependencyContainer): void {
        const Logger = container.resolve<ILogger>("WinstonLogger");
        Logger.logWithColor("[Console]: PostAkiLoadingAccess...", "yellow")
        return;
    }
    //添加商人头像
    private registerProfileImage(preAkiModLoader: PreAkiModLoader, imageRouter: ImageRouter): void {
        const imageFilepath = `./${preAkiModLoader.getModPath("火神重工-重启")}db/avatar`;
        imageRouter.addRoute(baseJson.avatar.replace(".jpg", ""), `${imageFilepath}/Persicaria.jpg`);
        imageRouter.addRoute(NSBase.avatar.replace(".png", ""), `${imageFilepath}/Polaris.png`)
    }
    //商人刷新时间
    private setupTraderUpdateTime(traderConfig: ITraderConfig): void {
        const traderRefreshRecord: UpdateTime = { traderId: baseJson._id, seconds: 3600 }
        const NSBasetraderRefreshRecord: UpdateTime = { traderId: NSBase._id, seconds: 3600 }
        traderConfig.updateTime.push(traderRefreshRecord);
        traderConfig.updateTime.push(NSBasetraderRefreshRecord);
    }
}

module.exports = { mod: new Mod() }