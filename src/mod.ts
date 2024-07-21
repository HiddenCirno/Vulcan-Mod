import { DependencyContainer } from "tsyringe";
import crypto from "crypto";
import { Item, Upd } from "@spt/models/eft/common/tables/IItem";
import { BaseClasses } from "@spt/models/enums/BaseClasses";
import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { IPreSptLoadMod } from "@spt/models/external/IPreSptLoadMod";
import { IPostSptLoadMod } from "@spt/models/external/IPostSptLoadMod";
import type { StaticRouterModService } from "@spt/services/mod/staticRouter/StaticRouterModService";
import { ILogger } from "@spt/models/spt/utils/ILogger";
import { ImageRouter } from "@spt/routers/ImageRouter";
import { ConfigServer } from "@spt/servers/ConfigServer";
import { ConfigTypes } from "@spt/models/enums/ConfigTypes";
import { ITraderConfig, UpdateTime } from "@spt/models/spt/config/ITraderConfig";
import { IInsuranceConfig } from "@spt/models/spt/config/IInsuranceConfig";
import { IModLoader } from "@spt/models/spt/mod/IModLoader";
import { JsonUtil } from "@spt/utils/JsonUtil";
import { VFS } from "@spt/utils/VFS"
import { Traders } from "@spt/models/enums/Traders";
import { ProfileHelper } from "@spt/helpers/ProfileHelper";
import { LauncherCallbacks } from "@spt/callbacks/LauncherCallbacks";
import { PreSptModLoader } from "@spt/loaders/PreSptModLoader";
import { ImporterUtil } from "@spt/utils/ImporterUtil"
import { VulcanCommon } from "../../[火神之心]VulcanCore/src/vulcan-api/Common";
import { ITraderAssort, ITraderBase } from "@spt/models/eft/common/tables/ITrader";
//import { ITraderConfig, UpdateTime } from "@spt/models/spt/config/ITraderConfig";
//
import * as baseJson from "../db/traders/Persicaria/base.json";
//
class Mod implements IPreSptLoadMod, IPostSptLoadMod, IPostDBLoadMod {

    private static container: DependencyContainer;
    public preSptLoad(container: DependencyContainer): void {
        Mod.container = container;
        const Logger = container.resolve<ILogger>("WinstonLogger");
        const PreSptModLoader = container.resolve("PreSptModLoader");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const FuncDatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const FuncImporterUtil = container.resolve<ImporterUtil>("ImporterUtil")
        const staticRouterModService = container.resolve<StaticRouterModService>("StaticRouterModService");
        const traderConfig = configServer.getConfig<ITraderConfig>(ConfigTypes.TRADER);
        const ModPath = PreSptModLoader.getModPath("火神重工-重启")
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`)
        const ClientDB = FuncDatabaseServer.getTables();
        const imageRouter = container.resolve<ImageRouter>("ImageRouter");
        const profileHelper = container.resolve<ProfileHelper>("ProfileHelper");
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        Logger.logWithColor("[Console]: PreSptLoadingAccess...", "yellow")
        container.afterResolution("BotGenerator", (_t, result) => {
            // We want to replace the original method logic with something different
            result.addDogtagToBot = (bot) => {
                return this.DogTagGenerator(bot);
            };
            // The modifier Always makes sure this replacement method is ALWAYS replaced
        }, { frequency: "Always" });
    }
    public postSptLoad(container: DependencyContainer): void {
        const Logger = container.resolve<ILogger>("WinstonLogger");
        Logger.logWithColor("[Console]: PostSptLoadingAccess...", "yellow")
    }
    public postDBLoad(container: DependencyContainer): void {
        const Logger = container.resolve<ILogger>("WinstonLogger");
        const PreSptModLoader = container.resolve("PreSptModLoader");
        const FuncDatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const FuncImporterUtil = container.resolve<ImporterUtil>("ImporterUtil")
        const imageRouter = container.resolve<ImageRouter>("ImageRouter");
        const launcherCallbacks = container.resolve<LauncherCallbacks>("LauncherCallbacks");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const VFS = container.resolve<VFS>("VFS");
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const common = container.resolve<VulcanCommon>("VulcanCommon")
        const ClientDB = FuncDatabaseServer.getTables();
        const ClientQuest = ClientDB.templates.quests
        const ClientItem = ClientDB.templates.items
        const ClientHideout = ClientDB.hideout.areas
        const ModPath = PreSptModLoader.getModPath("火神重工-重启")
        const imageFilepath = `./${ModPath}db/avatar/`;
        const iconPath = `${ModPath}images/quests/`
        const iconList = VFS.getFiles(iconPath);
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`)
        const Recipe = FuncImporterUtil.loadRecursive(`${ModPath}Recipe/`)
        const ServerVersion = launcherCallbacks.getServerVersion()
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
        const TraderMap = DB.templates.Map.TraderAssort.TraderMap
        const QuestMap = DB.templates.Map.QuestMap
        const ItemMap = DB.templates.Map.ItemMap
        const AllItems = ClientDB.templates.items;
        Logger.logWithColor("[Console]: PostDataBaseLoadingAccess...", "yellow")
        common.Log("心智云图已连接，正在加载数据……")
        common.waitForTime(2)
        common.Log("正在初始化商人……")
        common.waitForTime(2)
        common.initTrader(DB.traders.Persicaria, imageFilepath, 0.1, 90, 3600)
        common.Log("正在执行原版物品修改……")
        common.waitForTime(2)
        ClientItem["5b6d9ce188a4501afc1b2b25"]._props.Grids[0]._props.cellsV = 14
        ClientItem["5b6d9ce188a4501afc1b2b25"]._props.Grids[0]._props.cellsH = 14
        this.initWepons(container)
        this.initKeyEdit(container)
        common.Log("正在生成Boss……")
        common.waitForTime(2)
        //common.excludeLoot(DB.templates.items)
        common.excludeItemBlackList(DB.templates.airdropblacklist)
        this.initBotEdit(container)
        common.Log("正在加载藏身处……")
        common.waitForTime(2)
        this.initHideout(container)
        common.Log("正在初始化任务……")
        common.waitForTime(2)
        initQuest()
        common.Log("正在反序列化任务数据……")
        common.waitForTime(2)
        common.initQuestCond(DB.templates.QuestData.Vulcan.QuestConditions)
        common.loadRewardData(DB.templates.QuestData.Vulcan.QuestRewards)
        VFS.writeFile(`${ModPath}QuestExport.json`, JSON.stringify(ClientDB.templates.quests, null, 4))
        common.Log("正在反序列化商人数据……")
        common.waitForTime(2)
        common.initAssortData(DB.templates.TraderData.Vulcan.Persicaria.AssortData)
        common.indexQuestReward()
        VFS.writeFile(`${ModPath}questExport.json`, JSON.stringify(ClientDB.templates.quests, null, 4))
        //物品写入
        common.Log("正在加载物品数据……")
        common.waitForTime(2)
        common.initItem(DB.templates.items, 1)
        initArmBand()
        common.Log("正在加载本地化文本……")
        common.waitForTime(2)
        initLocales()
        common.Log("正在加载自定义服装……")
        common.waitForTime(2)
        initSuits()
        //dbHelper.loadItem(DB.templates.items)
        common.Log("正在修复容器类型……")
        common.waitForTime(2)
        common.fetchAsync().then(data => { }).catch(err => {
            const 公文包 = ClientDB.templates.items["外勤公文包"]._props.Grids[0]._props.filters[0].Filter
            //公文包容纳类型修复
            common.addItemWithRagfairTagBySize("5b47574386f77428ca22b2f1", 公文包, 1) //贵重物品
            common.addItemWithRagfairTagBySize("5b47574386f77428ca22b337", 公文包, 1) //药丸
            common.addItemWithRagfairTag("5b47574386f77428ca22b33a", 公文包) //注射器
            common.addItemWithRagfairTagBySize("5b47574386f77428ca22b33b", 公文包, 1) //子弹
            common.addItemWithRagfairTag("5b47574386f77428ca22b341", 公文包) //情报物品
            common.addItemWithRagfairTagBySize("5b47574386f77428ca22b345", 公文包, 1) //特殊装备
            common.addItemWithRagfairTag("5b5f78b786f77447ed5636af", 公文包) //钱 
            common.addItemWithRagfairTag("5c518ec986f7743b68682ce2", 公文包) //机械钥匙
            common.addItemWithRagfairTag("5c518ed586f774119a772aee", 公文包) //电子钥匙
            common.addItemWithRagfairTagBySize("5b47574386f77428ca22b339", 公文包, 1) //创伤治疗
            common.addItemWithRagfairTagBySize("5b47574386f77428ca22b336", 公文包, 1) //食品
            common.addItemWithRagfairTagBySize("5b47574386f77428ca22b335", 公文包, 1) //饮品
            公文包.push("59f32bb586f774757e1e8442") //Bear狗牌
            公文包.push("6662e9aca7e0b43baa3d5f74") //Bear狗牌(EOD)
            公文包.push("6662e9cda7e0b43baa3d5f76") //Bear狗牌(TUE)
            公文包.push("59f32c3b86f77472a31742f0") //Usec狗牌
            公文包.push("6662e9f37fa79a6d83730fa0") //Usec狗牌(EOD)
            公文包.push("6662ea05f6259762c56f3189") //Usec狗牌(TUE)
            公文包.push("阿萨兰之爪") //阿萨兰之爪
            公文包.push("5bc9c049d4351e44f824d360") //古董书
            公文包.push("5c0fa877d174af02a012e1cf") //滤嘴水壶 
            公文包.push("59fafd4b86f7745ca07e1232") //钥匙收纳器
            公文包.push("62a09d3bcf4a99369e262447") //钥匙扣
            公文包.push("5783c43d2459774bbe137486") //钱包
            公文包.push("60b0f6c058e0b0481a09ad11") //WZ钱包
            公文包.push("619cbf9e0a7c3a1a2731940a") //钥匙卡收纳盒 
        })
        //任务图片添加
        for (const icon of iconList) {
            const filename = VFS.stripExtension(icon);
            imageRouter.addRoute(`/files/quest/icon/${filename}`, `${iconPath}${icon}`);
        }
        common.Log("正在生成战利品……")
        common.waitForTime(2)
        //Bot Modifier
        //Bot战利品生成
        common.addLoot("高浓缩咖啡方糖", BotScav.inventory.items.Backpack, 25)
        common.addLoot("高浓缩咖啡方糖", BotScav.inventory.items.Pockets, 25)
        common.addLoot("高浓缩咖啡方糖", BotScav.inventory.items.TacticalVest, 25)
        common.addLoot("Vulcan高能量蛋白棒", BotScav.inventory.items.Backpack, 15)
        common.addLoot("Vulcan高能量蛋白棒", BotScav.inventory.items.Pockets, 15)
        common.addLoot("Vulcan高能量蛋白棒", BotScav.inventory.items.TacticalVest, 15)
        common.addLoot("Vulcan便携能量饮料包", BotScav.inventory.items.Backpack, 15)
        common.addLoot("Vulcan便携能量饮料包", BotScav.inventory.items.Pockets, 15)
        common.addLoot("Vulcan便携能量饮料包", BotScav.inventory.items.TacticalVest, 15)
        common.addLoot("Vulcan活力因子激活血清", BotSanitar.inventory.items.Pockets, 15)
        common.addLoot("Vulcan活力因子激活血清", BotKnight.inventory.items.Pockets, 15)
        common.addLoot("Vulcan活力因子激活血清", BotBigPipe.inventory.items.Pockets, 15)
        common.addLoot("Vulcan活力因子激活血清", BotBirdEye.inventory.items.Pockets, 15)
        common.addLoot("Vulcan活力因子激活血清", BotGlukhar.inventory.items.Pockets, 15)
        common.addLoot("Vulcan活力因子激活血清", BotShturman.inventory.items.Pockets, 15)
        common.addLoot("Vulcan活力因子激活血清", BotTagilla.inventory.items.Pockets, 15)
        common.addLoot("Vulcan活力因子激活血清", BotKilla.inventory.items.Pockets, 15)
        //AddLoot("Vulcan活力因子激活血清", BotReshala.inventory.items.Pockets, 15)
        common.addLoot("Vulcan实验型再生促进血清", BotSanitar.inventory.items.Pockets, 15)
        common.addLoot("Vulcan实验型再生促进血清", BotKnight.inventory.items.Pockets, 15)
        common.addLoot("Vulcan实验型再生促进血清", BotBigPipe.inventory.items.Pockets, 15)
        common.addLoot("Vulcan实验型再生促进血清", BotBirdEye.inventory.items.Pockets, 15)
        common.addLoot("Vulcan实验型再生促进血清", BotGlukhar.inventory.items.Pockets, 15)
        common.addLoot("Vulcan实验型再生促进血清", BotShturman.inventory.items.Pockets, 15)
        common.addLoot("Vulcan实验型再生促进血清", BotTagilla.inventory.items.Pockets, 15)
        common.addLoot("Vulcan实验型再生促进血清", BotKilla.inventory.items.Pockets, 15)
        //容器战利品(仍需验证)(已经生效)
        //普通报价单处理
        //common.addAssort("Persicaria", "Beta臂带", 1, 1)
        //common.addAssort("Persicaria", "昭烈帝臂带", 1, 1)
        //common.addAssort("Persicaria", "支持者纪念币_葬爱", 1, 1)
        common.addAssort("Persicaria", "妖精女仆长的臂带", 20011113, 4)
        common.addAssort("5ac3b934156ae10c4430e83c", "小腰包", 1476, 1)
        //自定义控制台输出
        common.Log("所有数据加载完毕，欢迎回来，指挥官。")
        common.waitForTime(2)
        function initArmBand() {
            for (let i in ClientDB.templates.profiles) {
                ClientDB.templates.profiles[i].bear.character.Inventory.items.push({
                    _id: common.generateHash(`${i}_bear_Beta`),
                    _tpl: "Beta臂带",
                    parentId: ClientDB.templates.profiles[i].bear.character.Inventory.equipment,
                    slotId: "ArmBand"
                })
                ClientDB.templates.profiles[i].usec.character.Inventory.items.push({
                    _id: common.generateHash(`${i}_usec_Beta`),
                    _tpl: "Beta臂带",
                    parentId: ClientDB.templates.profiles[i].usec.character.Inventory.equipment,
                    slotId: "ArmBand"
                })
            }
        }
        function initLocales() {
            //邮箱本地化文本处理
            for (let mails in DB.locales["ch"].mail) {
                ClientDB.locales.global["ch"][mails] = DB.locales["ch"].mail[mails]
            }
            //任务本地化文本支持
            //Customcommon.Log("正在加载任务数据...")
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
                if (Config.Debug) {
                    common.Log("任务数据加载成功: " + DB.locales["ch"].quest[quests].name)
                }
            }
        }
        function initQuest() {
            for (let quest in DB.templates.QuestData.Vulcan.initQuest) {
                var Q = DB.templates.QuestData.Vulcan.initQuest[quest]
                common.createQuest(Q.ID, Q.TraderID, Q.Type, Q.imagepath, Q.Location, Q.Restartable)
                //ClientDB.templates.quests[quest] = DB.templates.quests[quest]
            }
        }
        function initSuits() {
            //服装生成
            //Customcommon.Log("正在加载服装数据...")
            for (let ct in DB.templates.custom) {
                var Local = ClientDB.locales.global["ch"]
                ClientDB.templates.customization[ct] = DB.templates.custom[ct]
                Local[ClientDB.templates.customization[ct]._id + " Name"] = ClientDB.templates.customization[ct]._props.Name
                Local[ClientDB.templates.customization[ct]._id + " ShortName"] = ClientDB.templates.customization[ct]._props.ShortName
                Local[ClientDB.templates.customization[ct]._id + " Description"] = ClientDB.templates.customization[ct]._props.Description
                if (Config.Debug) {
                    common.Log("服装数据加载成功: " + Local[ClientDB.templates.customization[ct]._id + " Name"])
                }
            }
            //狗&瓦鸡
            for(var i = 0; i < DB.templates.suits.length; i++){
                ClientDB.traders["5ac3b934156ae10c4430e83c"].suits.push(DB.templates.suits[i])
            }
            //战术服服务移交服装商
            for(var i = 0; i < DB.traders.Persicaria.suits.length; i++){
                ClientDB.traders["5ac3b934156ae10c4430e83c"].suits.push(DB.traders.Persicaria.suits[i])
            }
        }
    }
    public initKeyEdit(container: DependencyContainer): void {
        const Logger = container.resolve<ILogger>("WinstonLogger");
        const PreSptModLoader = container.resolve("PreSptModLoader");
        const FuncDatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const FuncImporterUtil = container.resolve<ImporterUtil>("ImporterUtil")
        const VFS = container.resolve<VFS>("VFS");
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const ClientDB = FuncDatabaseServer.getTables();
        const ClientQuest = ClientDB.templates.quests
        const ClientItem = ClientDB.templates.items
        const ClientHideout = ClientDB.hideout.areas
        const Profile = ClientDB.templates.profiles
        const ModPath = PreSptModLoader.getModPath("火神重工-重启")
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`)
        var Therapist = "5ac3b934156ae10c4430e83c"
        var Therapist2 = "54cb57776803fa99248b456e"
        var AssortData = ClientDB.traders[Therapist].assort
        const Locale = ClientDB.locales.global["ch"]
        const ELocale = ClientDB.locales.global["en"]
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
    public initHideout(container: DependencyContainer): void {
        const Logger = container.resolve<ILogger>("WinstonLogger");
        const PreSptModLoader = container.resolve("PreSptModLoader");
        const FuncDatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const FuncImporterUtil = container.resolve<ImporterUtil>("ImporterUtil")
        const VFS = container.resolve<VFS>("VFS");
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const ClientDB = FuncDatabaseServer.getTables();
        const ClientQuest = ClientDB.templates.quests
        const ClientItem = ClientDB.templates.items
        const ClientHideout = ClientDB.hideout.areas
        const Profile = ClientDB.templates.profiles
        const ModPath = PreSptModLoader.getModPath("火神重工-重启")
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`)
        var Therapist = "5ac3b934156ae10c4430e83c"
        var Therapist2 = "54cb57776803fa99248b456e"
        var AssortData = ClientDB.traders[Therapist].assort
        const Locale = ClientDB.locales.global["ch"]
        const ELocale = ClientDB.locales.global["en"]
        const customHideout = DB.templates.HideoutData.Vulcan.HideoutData
        const AreaMap = customHideout.AreaType
        const hideout = customHideout.Hideout
        const recipe = DB.templates.HideoutData.Vulcan.RecipeData
        const sc = DB.templates.HideoutData.Vulcan.ScavCaseData

        ClientDB.hideout.production.find(x => x.endProduct == "5e85a9f4add9fe03027d9bf1").requirements.push({
            "templateId": "荧石粉",
            "count": 1,
            "isFunctional": false,
            "isEncoded": false,
            "type": "Item"
        })
        ClientDB.hideout.production.find(x => x.endProduct == "5a0c27731526d80618476ac4").requirements.find(x => x.templateId == "590c5a7286f7747884343aea").templateId = "荧石粉"
        //ClientDB.hideout.production[25].requirements.push({

        ClientItem["5733279d245977289b77ec24"]._props.MaxResource = 40
        ClientItem["5733279d245977289b77ec24"]._props.Resource = 40
        ClientItem["5733279d245977289b77ec24"]._parent = "5d650c3e815116009f6201d2"
        ClientItem["5d03794386f77420415576f5"]._props.MaxResource = 150
        ClientItem["5d03794386f77420415576f5"]._props.Resource = 150
        ClientItem["5d03794386f77420415576f5"]._parent = "5d650c3e815116009f6201d2"
        //太阳能需求修改
        for (var i = 0; i < ClientHideout.length; i++) {
            if (ClientHideout[i].type == 18) {
                ClientHideout[i].stages["1"].bonuses[0].value = -60
            }
            if (ClientHideout[i].type == 4) {
                ClientHideout[i].stages["1"].bonuses[0].filter.push("5733279d245977289b77ec24") //汽车蓄电池
                ClientHideout[i].stages["2"].bonuses[0].filter.push("5d03794386f77420415576f5") //坦克电池
                ClientHideout[i].stages["3"].bonuses[0].filter.push("能量水晶")
                ClientHideout[i].stages["3"].bonuses[0].filter.push("兰波顿水晶")
            }
            if (ClientHideout[i].type == 6) {
                //ClientHideout[i].stages["3"].bonuses[1].filter.push("5733279d245977289b77ec24") //滤罐
            }
        }
        for (var i = 0; i < ClientHideout.length; i++) {
            for (let a in hideout) {
                const Area = ClientHideout[i]
                const type = AreaMap[a]
                var Req = []
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
                                    })
                                }
                            }
                            if (!isEmptyObject(hideout[a].Level[l1].area)) {
                                for (let r in hideout[a].Level[l1].area) {
                                    Req.push({
                                        "areaType": AreaMap[r],
                                        "requiredLevel": hideout[a].Level[l1].area[r],
                                        "type": "Area"
                                    })
                                }
                            }
                            if (!isEmptyObject(hideout[a].Level[l1].trader)) {
                                for (let r in hideout[a].Level[l1].trader) {
                                    Req.push({
                                        "traderId": r,
                                        "loyaltyLevel": hideout[a].Level[l1].trader[r],
                                        "type": "TraderLoyalty"
                                    })
                                }
                            }
                            Area.stages[l1].requirements = Req
                            Area.stages[l1].constructionTime = hideout[a].Level[l1].time
                        }
                    }
                }
            }
        }
        for (let i in recipe) {
            var R = recipe[i]

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

            })
            ClientDB.hideout.production[ClientDB.hideout.production.length - 1].requirements.push({
                areaType: R.Area,
                requiredLevel: R.AreaLevel,
                type: "Area"
            })

            if (R.Locked == true) {

                ClientDB.hideout.production[ClientDB.hideout.production.length - 1].requirements.push({
                    questId: R.Quest,
                    type: "QuestComplete"
                })
                const Reward = ClientDB.templates.quests[R.Quest].rewards.Success
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
                })
            }
            for (let j in R.Require.Tool) {
                ClientDB.hideout.production[ClientDB.hideout.production.length - 1].requirements.push({
                    templateId: j,
                    "type": "Tool"
                })
            }
            for (let j in R.Require.Item) {
                ClientDB.hideout.production[ClientDB.hideout.production.length - 1].requirements.push({
                    templateId: j,
                    "count": R.Require.Item[j],
                    "isFunctional": false,
                    "isEncoded": false,
                    "type": "Item"
                })
            }
            //ClientDB.hideout.production.push(result)
        }
        for (let i in sc) {
            ClientDB.hideout.scavcase.push(sc[i])
        }
        function isEmptyObject(obj) {
            return Object.keys(obj).length === 0;
        }
    }
    public initBotEdit(container: DependencyContainer): void {
        const Logger = container.resolve<ILogger>("WinstonLogger");
        const PreSptModLoader = container.resolve("PreSptModLoader");
        const FuncDatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const FuncImporterUtil = container.resolve<ImporterUtil>("ImporterUtil")
        const imageRouter = container.resolve<ImageRouter>("ImageRouter");
        const launcherCallbacks = container.resolve<LauncherCallbacks>("LauncherCallbacks");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const VFS = container.resolve<VFS>("VFS");
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const ClientDB = FuncDatabaseServer.getTables();
        const ClientQuest = ClientDB.templates.quests
        const ClientItem = ClientDB.templates.items
        const ClientHideout = ClientDB.hideout.areas
        const ModPath = PreSptModLoader.getModPath("火神重工-重启")
        const imageFilepath = `./${ModPath}db/avatar/`;
        const iconPath = `${ModPath}images/quests/`
        const iconList = VFS.getFiles(iconPath);
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`)
        const Recipe = FuncImporterUtil.loadRecursive(`${ModPath}Recipe/`)
        const ServerVersion = launcherCallbacks.getServerVersion()
        //const SVCheck = versionFormatCheck(ServerVersion)
        //#MC头兼容
        const ClientBot = ClientDB.bots.types
        const Scav = ClientBot.cursedassault
        const CrazyScav = ClientBot.assault
        const Tagilla = ClientBot.bosstagilla
        const SectantPriest = ClientBot.sectantpriest
        const Sectant = ClientBot.sectantwarrior
        const Bear = ClientBot.bear
        const Usec = ClientBot.usec
        const common = container.resolve<VulcanCommon>("VulcanCommon")
        Scav.inventory.equipment.FaceCover["MC南瓜头"] = 45
        Scav.inventory.equipment.FaceCover["史蒂夫头"] = 45
        Scav.inventory.equipment.FaceCover["苦力怕头"] = 30
        Scav.inventory.equipment.FaceCover["小黑头"] = 30
        Scav.inventory.equipment.FaceCover["僵尸头"] = 30
        Scav.inventory.equipment.FaceCover["骷髅头"] = 30
        Scav.inventory.equipment.FaceCover["凋灵骷髅头"] = 30
        CrazyScav.inventory.equipment.FaceCover["MC南瓜头"] = 45
        CrazyScav.inventory.equipment.FaceCover["史蒂夫头"] = 45
        CrazyScav.inventory.equipment.FaceCover["苦力怕头"] = 30
        CrazyScav.inventory.equipment.FaceCover["小黑头"] = 30
        CrazyScav.inventory.equipment.FaceCover["僵尸头"] = 30
        CrazyScav.inventory.equipment.FaceCover["骷髅头"] = 30
        CrazyScav.inventory.equipment.FaceCover["凋灵骷髅头"] = 30
        Bear.inventory.equipment.FaceCover["MC南瓜头"] = 5
        Bear.inventory.equipment.FaceCover["史蒂夫头"] = 5
        Bear.inventory.equipment.FaceCover["苦力怕头"] = 5
        Bear.inventory.equipment.FaceCover["小黑头"] = 5
        Bear.inventory.equipment.FaceCover["僵尸头"] = 5
        Bear.inventory.equipment.FaceCover["骷髅头"] = 5
        Bear.inventory.equipment.FaceCover["凋灵骷髅头"] = 5
        Bear.inventory.equipment.FaceCover["HIM头"] = 1
        Bear.inventory.equipment.FaceCover["凋灵头"] = 2
        Usec.inventory.equipment.FaceCover["MC南瓜头"] = 5
        Usec.inventory.equipment.FaceCover["史蒂夫头"] = 5
        Usec.inventory.equipment.FaceCover["苦力怕头"] = 5
        Usec.inventory.equipment.FaceCover["小黑头"] = 5
        Usec.inventory.equipment.FaceCover["僵尸头"] = 5
        Usec.inventory.equipment.FaceCover["骷髅头"] = 5
        Usec.inventory.equipment.FaceCover["凋灵骷髅头"] = 5
        Usec.inventory.equipment.FaceCover["HIM头"] = 1
        Usec.inventory.equipment.FaceCover["凋灵头"] = 2
        SectantPriest.inventory.equipment.FaceCover = {}
        SectantPriest.inventory.equipment.FaceCover["HIM头"] = 1
        SectantPriest.inventory.equipment.FaceCover["凋灵头"] = 9
        Sectant.inventory.equipment.FaceCover = {}
        Sectant.inventory.equipment.FaceCover["MC南瓜头"] = 10
        Sectant.inventory.equipment.FaceCover["苦力怕头"] = 10
        Sectant.inventory.equipment.FaceCover["僵尸头"] = 10
        Sectant.inventory.equipment.FaceCover["骷髅头"] = 10
        Sectant.inventory.equipment.FaceCover["小黑头"] = 10
        Sectant.inventory.equipment.FaceCover["凋灵骷髅头"] = 10
        Sectant.inventory.equipment.FaceCover["凋灵头"] = 1
        Tagilla.inventory.equipment.FaceCover["HIM头"] = 5
        Tagilla.inventory.equipment.FaceCover["凋灵头"] = 15
        //end
        const ReshalaChance = 40
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
            "followerkolontay",
            "followerboarclose1",
            "followerboarclose2",
            "followerkojaniy",
            "followersanitar",
            "followerboar",
            "pmcbot",
            "exusec",
            "bossboarsniper",
            "arenafighter",
            "arenafighterevent",
            "crazyassaultevent",
            "gifter"
        ]
        const botConfig = configServer.getConfig(ConfigTypes.BOT);
        for (var i = 0; i < BossList.length; i++) {
            botConfig.botRolesWithDogTags.push(BossList[i])
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
            "currency": {
                "weights": {
                    "0": 1,
                    "1": 0,
                    "2": 0
                },
                "whitelist": []
            },
            "drink": {
                "weights": {
                    "0": 1,
                    "1": 0,
                    "2": 0
                },
                "whitelist": []
            },
            "food": {
                "weights": {
                    "0": 1,
                    "1": 0,
                    "2": 0
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
            "currency": {
                "weights": {
                    "0": 0,
                    "1": 4,
                    "2": 1
                },
                "whitelist": []
            },
            "drink": {
                "weights": {
                    "0": 1,
                    "1": 0,
                    "2": 0
                },
                "whitelist": []
            },
            "food": {
                "weights": {
                    "0": 1,
                    "1": 0,
                    "2": 0
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
        ClientDB.bots.types.sectantpriest.chances.weaponMods = DB.bots.types.Priest.chances.weaponMods
        ClientDB.bots.types.sectantpriest.inventory = DB.bots.types.Priest.inventory
        for(let d in ClientDB.bots.types.sectantpriest.difficulty){
            ClientDB.bots.types.sectantpriest.difficulty[d].Mind = ClientDB.bots.types.bosstagilla.difficulty[d].Mind
        }
        //ClientDB.bots.types.sectantpriest.difficulty = DB.bots.types.Priest.difficulty
    }
    public initWepons(container: DependencyContainer): void {
        const Logger = container.resolve<ILogger>("WinstonLogger");
        const PreSptModLoader = container.resolve("PreSptModLoader");
        const FuncDatabaseServer = container.resolve<DatabaseServer>("DatabaseServer");
        const FuncImporterUtil = container.resolve<ImporterUtil>("ImporterUtil")
        const imageRouter = container.resolve<ImageRouter>("ImageRouter");
        const launcherCallbacks = container.resolve<LauncherCallbacks>("LauncherCallbacks");
        const configServer = container.resolve<ConfigServer>("ConfigServer");
        const VFS = container.resolve<VFS>("VFS");
        const JsonUtil = container.resolve<JsonUtil>("JsonUtil");
        const ClientDB = FuncDatabaseServer.getTables();
        const ClientQuest = ClientDB.templates.quests
        const ClientItem = ClientDB.templates.items
        const ClientHideout = ClientDB.hideout.areas
        const ModPath = PreSptModLoader.getModPath("火神重工-重启")
        const imageFilepath = `./${ModPath}db/avatar/`;
        const iconPath = `${ModPath}images/quests/`
        const iconList = VFS.getFiles(iconPath);
        const DB = FuncImporterUtil.loadRecursive(`${ModPath}db/`)
        const Recipe = FuncImporterUtil.loadRecursive(`${ModPath}Recipe/`)
        const ServerVersion = launcherCallbacks.getServerVersion()
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
    }
    public DogTagGenerator(bot) {
        const botGenerator = Mod.container.resolve("BotGenerator")
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
                } else {
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
        ]
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
        ]
        var BossName = "Nikita"
        switch (bot.Info.Settings.Role.toLowerCase()) {
            case "bossbully": {
                BossName = "Reshala"
                break;
            }
            case "bossboar": {
                BossName = "Kaban"
                break;
            }
            case "bosskojanly": {
                BossName = "Shturman"
                break;
            }
            case "followerbigpipe": {
                BossName = "Big Pipe"
                break;
            }
            case "followerbirdeye": {
                BossName = "Birdeye"
                break;
            }
            default: {
                BossName = bot.Info.Settings.Role.substring(4)
            }
        }
        const dogtagUpd: Upd = {
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
        const dogtagScavUpd: Upd = {
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
        const dogtagBossUpd: Upd = {
            SpawnedInSession: true,
            Dogtag: {
                AccountId: bot.sessionId,
                ProfileId: bot._id,
                Nickname: BossName,
                Side: "Bear",
                Level: 100,
                Time: getLocalDateTimeString(),
                Status: Math.random() <= 0.9 ? "已死亡" : DeathStatus[Math.floor(Math.random() * DeathStatus.length)],
                KillerAccountId: "Unknown",
                KillerProfileId: "Unknown",
                KillerName: "",
                WeaponName: "解析失败",
            },
        };
        const dogtagGoonsUpd: Upd = {
            SpawnedInSession: true,
            Dogtag: {
                AccountId: bot.sessionId,
                ProfileId: bot._id,
                Nickname: BossName,
                Side: "Bear",
                Level: 100,
                Time: getLocalDateTimeString(),
                Status: Math.random() <= 0.9 ? "已死亡" : DeathStatus[Math.floor(Math.random() * DeathStatus.length)],
                KillerAccountId: "Unknown",
                KillerProfileId: "Unknown",
                KillerName: "",
                WeaponName: "解析失败",
            },
        };
        const dogtagSectantUpd: Upd = {
            SpawnedInSession: true,
            Dogtag: {
                AccountId: bot.sessionId,
                ProfileId: bot._id,
                Nickname: russianToLatinApproximation(bot.Info.Nickname),
                Side: "Usec",
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
        const PMCinventoryItem: Item = {
            _id: `${bot._id}_${bot.Info.Side}_${bot.Info.Nickname}_${Date.now()}`,
            _tpl: botGenerator.getDogtagTplByGameVersionAndSide(bot.Info.Side, bot.Info.GameVersion),
            parentId: bot.Inventory.equipment,
            slotId: "Dogtag",
            location: undefined,
            upd: dogtagUpd,
        };
        const SavageinventoryItem: Item = {
            _id: `${bot._id}_${bot.Info.Side}_${bot.Info.Nickname}_${Date.now()}`,
            _tpl: "Scav狗牌",
            parentId: bot.Inventory.equipment,
            slotId: "Dogtag",
            location: undefined,
            upd: dogtagScavUpd,
        };
        const SectantinventoryItem: Item = {
            _id: `${bot._id}_${bot.Info.Side}_${bot.Info.Nickname}_${Date.now()}`,
            _tpl: "邪教徒狗牌",
            parentId: bot.Inventory.equipment,
            slotId: "Dogtag",
            location: undefined,
            upd: dogtagSectantUpd,
        };
        const BossinventoryItem: Item = {
            _id: `${bot._id}_${bot.Info.Side}_${bot.Info.Nickname}_${Date.now()}`,
            _tpl: "Boss狗牌",
            parentId: bot.Inventory.equipment,
            slotId: "Dogtag",
            location: undefined,
            upd: dogtagBossUpd,
        };
        const GoonsinventoryItem: Item = {
            _id: `${bot._id}_${bot.Info.Side}_${bot.Info.Nickname}_${Date.now()}`,
            _tpl: "Boss狗牌",
            parentId: bot.Inventory.equipment,
            slotId: "Dogtag",
            location: undefined,
            upd: dogtagGoonsUpd,
        };
        if (DisplayBossList.includes(bot.Info.Settings.Role.toLowerCase())) {
            var bossStr = bot.Info.Settings.Role.toLowerCase()
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

module.exports = { mod: new Mod() }