'use strict';

/* ══════════════════════════════════════════════════  CARD DATA  ══ */

const CARDS = [
  { id:'cat',           rarity:'common',    type:'动物', name:'小猫',     hp: 40,  icon:'🐱', desc:'喜欢睡懒觉，最爱晒太阳' },
  { id:'rabbit',        rarity:'common',    type:'动物', name:'小兔',     hp: 35,  icon:'🐰', desc:'蹦蹦跳跳的可爱白兔' },
  { id:'dog',           rarity:'common',    type:'动物', name:'小狗',     hp: 45,  icon:'🐶', desc:'忠诚勇敢，是最好的朋友' },
  { id:'star',          rarity:'common',    type:'魔法', name:'小星星',   hp: 30,  icon:'⭐', desc:'夜空中最亮的那颗星' },
  { id:'sunflower',     rarity:'common',    type:'自然', name:'向日葵',   hp: 35,  icon:'🌻', desc:'永远追随太阳的笑脸' },
  { id:'bird',          rarity:'common',    type:'动物', name:'小鸟',     hp: 32,  icon:'🐦', desc:'每天清晨第一个唱歌' },
  { id:'unicorn',       rarity:'rare',      type:'魔法', name:'独角兽',   hp: 80,  icon:'🦄', desc:'神秘森林守护者，拥有神奇魔力' },
  { id:'dragon',        rarity:'rare',      type:'火',   name:'小龙',     hp: 90,  icon:'🐉', desc:'会喷七彩火焰的可爱小龙' },
  { id:'magiccat',      rarity:'rare',      type:'魔法', name:'魔法猫',   hp: 75,  icon:'✨', desc:'掌握古老魔法的神秘猫咪' },
  { id:'mermaid',       rarity:'rare',      type:'水',   name:'美人鱼',   hp: 85,  icon:'🧜', desc:'深海里最美丽的精灵' },
  { id:'pikachu',       rarity:'legendary', type:'电',   name:'皮卡丘',   hp: 200, icon:'⚡', desc:'世界最有名的电气鼠，充满活力！' },
  { id:'rainbowdragon', rarity:'legendary', type:'魔法', name:'彩虹龙',   hp: 250, icon:'🌈', desc:'跨越天际的彩虹神龙，拥有七色神力！' },
  { id:'starking',      rarity:'legendary', type:'宇宙', name:'星星之王', hp: 300, icon:'👑', desc:'统治无尽星空的永恒王者！' },
];
const RARITY_LABEL  = { common:'普通', rare:'稀有', legendary:'传说' };
const TYPE_COLOR    = { 动物:'#16a34a', 火:'#dc2626', 水:'#2563eb', 电:'#d97706', 魔法:'#7c3aed', 宇宙:'#1e40af', 自然:'#15803d' };
const SPARKLE_COLS  = {
  legendary:['#ffd700','#ffec3d','#ff8c00','#fff','#ffa500','#ffe066'],
  rare:     ['#c084fc','#a855f7','#818cf8','#fff','#e879f9','#ddd6fe'],
  common:   ['#34d399','#6ee7b7','#86efac','#fff','#a3e635'],
};

/* ══════════════════════════════════════════════════  IMAGE CARD POOLS  ══
   Fill these arrays with file paths to enable image cards.
   System pool: 65% weight  |  Custom pool: 35% weight
   Rarity is independent: common 70%, rare 25%, legendary 5%
   ─────────────────────────────────────────────────────────────────────── */
const SYSTEM_POOL = {
  common:    [],   // e.g. 'cards/common/panda.png'
  rare:      [],   // e.g. 'cards/rare/phoenix.png'
  legendary: []    // e.g. 'cards/legendary/dragon_king.png'
};
// CUSTOM_POOL — auto-populated from user_define_card/; edit or extend as needed.
// Paths are relative to index.html. User can also edit via the in-app card config UI.
const CUSTOM_POOL = {
  common: [
    'user_define_card/pk.png','user_define_card/pk2.png','user_define_card/pk3.png',
    'user_define_card/pk4.png','user_define_card/pk5.png','user_define_card/pk7.png',
    'user_define_card/pk8.png','user_define_card/pk9.png','user_define_card/pk10.png',
    'user_define_card/pk11.png','user_define_card/pk12.png','user_define_card/pk13.png',
    'user_define_card/pk14.png','user_define_card/pk15.png','user_define_card/pk16.png',
    'user_define_card/pk17.png','user_define_card/pk18.png',
  ],
  rare: [
    'user_define_card/pk19.png','user_define_card/pk20.png','user_define_card/pk21.png',
    'user_define_card/pk22.png','user_define_card/pk23.png','user_define_card/pk24.png',
  ],
  legendary: [
    'user_define_card/pk25.png','user_define_card/pk26.png',
  ],
};

/* ══════════════════════════════════════════════════  PINYIN MAP  ══
   ~800 common characters. Fallback: · shown when char not in map.   */
const PINYIN = {
  // ── 数字 ──
  "零":"líng","一":"yī","二":"èr","三":"sān","四":"sì","五":"wǔ",
  "六":"liù","七":"qī","八":"bā","九":"jiǔ","十":"shí",
  "百":"bǎi","千":"qiān","万":"wàn","亿":"yì","半":"bàn","倍":"bèi",
  // ── 代词 ──
  "我":"wǒ","你":"nǐ","他":"tā","她":"tā","它":"tā","们":"men",
  "这":"zhè","那":"nà","什":"shén","么":"me","谁":"shuí",
  "哪":"nǎ","怎":"zěn","为":"wèi","何":"hé","其":"qí","此":"cǐ",
  "自":"zì","己":"jǐ","每":"měi","各":"gè","某":"mǒu","别":"bié",
  // ── 基本动词 ──
  "是":"shì","不":"bù","有":"yǒu","在":"zài","来":"lái","去":"qù",
  "看":"kàn","说":"shuō","听":"tīng","写":"xiě","读":"dú","做":"zuò",
  "走":"zǒu","跑":"pǎo","跳":"tiào","飞":"fēi","游":"yóu",
  "吃":"chī","喝":"hē","睡":"shuì","站":"zhàn","坐":"zuò",
  "想":"xiǎng","知":"zhī","道":"dào","学":"xué","习":"xí",
  "叫":"jiào","用":"yòng","开":"kāi","关":"guān","进":"jìn",
  "出":"chū","回":"huí","买":"mǎi","卖":"mài","玩":"wán",
  "帮":"bāng","找":"zhǎo","给":"gěi","拿":"ná","放":"fàng",
  "喜":"xǐ","爱":"ài","笑":"xiào","哭":"kū","问":"wèn",
  "答":"dá","教":"jiào","告":"gào","诉":"sù","请":"qǐng",
  "谢":"xiè","见":"jiàn","发":"fā","打":"dǎ","接":"jiē",
  "带":"dài","送":"sòng","拍":"pāi","画":"huà","唱":"chàng",
  "演":"yǎn","落":"luò","生":"shēng","长":"zhǎng","照":"zhào",
  "变":"biàn","保":"bǎo","展":"zhǎn","完":"wán","起":"qǐ",
  "让":"ràng","被":"bèi","把":"bǎ","得":"dé","着":"zhe",
  "过":"guò","了":"le","将":"jiāng","会":"huì","能":"néng",
  "可":"kě","要":"yào","应":"yīng","该":"gāi","需":"xū",
  "跟":"gēn","像":"xiàng","比":"bǐ","向":"xiàng","往":"wǎng",
  // ── 扩展动词 ──
  "停":"tíng","转":"zhuǎn","换":"huàn","推":"tuī","拉":"lā",
  "洗":"xǐ","扫":"sǎo","擦":"cā","整":"zhěng","刷":"shuā",
  "煮":"zhǔ","炒":"chǎo","烤":"kǎo","烧":"shāo","切":"qiē","剪":"jiǎn",
  "修":"xiū","造":"zào","建":"jiàn","设":"shè","造":"zào",
  "借":"jiè","还":"huán","租":"zū","付":"fù",
  "注":"zhù","守":"shǒu","护":"hù","选":"xuǎn",
  "追":"zhuī","抓":"zhuā","踢":"tī","搬":"bān","扔":"rēng",
  "摇":"yáo","翻":"fān","移":"yí","举":"jǔ","挥":"huī",
  "捧":"pěng","抱":"bào","握":"wò","吹":"chuī",
  "采":"cǎi","摘":"zhāi","种":"zhòng","跪":"guì","蹲":"dūn",
  "躺":"tǎng","趴":"pā","爬":"pá","敲":"qiāo","揉":"róu",
  "撕":"sī","贴":"tiē","挂":"guà","盖":"gài","填":"tián",
  "穿":"chuān","脱":"tuō","绑":"bǎng","结":"jié","解":"jiě",
  "逃":"táo","躲":"duǒ","休":"xiū","息":"xī","觉":"jué",
  "努":"nǔ","忘":"wàng","记":"jì","猜":"cāi","测":"cè","验":"yàn",
  "决":"jué","判":"pàn","估":"gū","练":"liàn","备":"bèi",
  "期":"qī","待":"dài","望":"wàng","信":"xìn","靠":"kào",
  "感":"gǎn","觉":"jué","认":"rèn","知":"zhī","晓":"xiǎo",
  "懂":"dǒng","明":"míng","白":"bái","清":"qīng","楚":"chǔ",
  "熟":"shú","悉":"xī","善":"shàn","擅":"shàn","精":"jīng",
  "通":"tōng","掌":"zhǎng","握":"wò","控":"kòng","制":"zhì",
  "管":"guǎn","理":"lǐ","治":"zhì","领":"lǐng","导":"dǎo",
  "指":"zhǐ","挥":"huī","组":"zǔ","织":"zhī","安":"ān",
  "排":"pái","分":"fēn","配":"pèi","合":"hé","作":"zuò",
  "参":"cān","加":"jiā","参":"cān","与":"yǔ","加":"jiā",
  "出":"chū","席":"xí","访":"fǎng","问":"wèn","拜":"bài",
  "访":"fǎng","迎":"yíng","接":"jiē","待":"dài","欢":"huān",
  "迎":"yíng","庆":"qìng","祝":"zhù","纪":"jì","念":"niàn",
  // ── 人 ──
  "人":"rén","老":"lǎo","师":"shī","同":"tóng","父":"fù","母":"mǔ",
  "爸":"bà","妈":"mā","哥":"gē","姐":"jiě","弟":"dì","妹":"mèi",
  "朋":"péng","友":"yǒu","孩":"hái","子":"zǐ","男":"nán","女":"nǚ",
  "儿":"ér","童":"tóng","王":"wáng","李":"lǐ","张":"zhāng",
  "小":"xiǎo","明":"míng","红":"hóng","华":"huá","家":"jiā",
  "婆":"pó","公":"gōng","伯":"bó","叔":"shū","阿":"ā","姨":"yí",
  "邻":"lín","居":"jū","客":"kè","医":"yī","生":"shēng",
  "祖":"zǔ","亲":"qīn","孙":"sūn","曾":"zēng","代":"dài",
  "警":"jǐng","察":"chá","工":"gōng","农":"nóng","兵":"bīng",
  "商":"shāng","民":"mín","族":"zú","俗":"sú","众":"zhòng",
  "群":"qún","队":"duì","团":"tuán","班":"bān","组":"zǔ",
  // ── 方向 ──
  "东":"dōng","南":"nán","北":"běi",
  "西":"xī",
  // ── 自然 ──
  "天":"tiān","地":"dì","水":"shuǐ","火":"huǒ","山":"shān",
  "云":"yún","风":"fēng","雨":"yǔ","雪":"xuě","花":"huā",
  "草":"cǎo","树":"shù","木":"mù","石":"shí","土":"tǔ",
  "日":"rì","月":"yuè","星":"xīng","光":"guāng","空":"kōng",
  "河":"hé","海":"hǎi","湖":"hú","春":"chūn","夏":"xià",
  "秋":"qiū","冬":"dōng","年":"nián","鸟":"niǎo","鱼":"yú",
  "马":"mǎ","牛":"niú","羊":"yáng","猪":"zhū","鸡":"jī",
  "狗":"gǒu","猫":"māo","虫":"chóng","蝴":"hú","蝶":"dié",
  "青":"qīng","蛙":"wā","兔":"tù","熊":"xióng","狮":"shī",
  "虎":"hǔ","象":"xiàng","叶":"yè","根":"gēn","枝":"zhī",
  "果":"guǒ","苹":"píng","香":"xiāng","蕉":"jiāo","葡":"pú",
  "萄":"táo","西":"xī","瓜":"guā","阳":"yáng","晴":"qíng",
  "雷":"léi","电":"diàn","彩":"cǎi","虹":"hóng",
  "浪":"làng","潮":"cháo","沙":"shā","泥":"ní","冰":"bīng",
  "森":"sēn","林":"lín","竹":"zhú","松":"sōng","梅":"méi",
  "兰":"lán","菊":"jú","荷":"hé","藕":"ǒu","莲":"lián",
  "谷":"gǔ","峰":"fēng","坡":"pō","溪":"xī","泉":"quán",
  "池":"chí","塘":"táng","湾":"wān","岛":"dǎo","洲":"zhōu",
  "原":"yuán","野":"yě","田":"tián","园":"yuán","场":"chǎng",
  "晒":"shài","淋":"lín","冻":"dòng","融":"róng","潮":"cháo",
  "湿":"shī","干":"gān","旱":"hàn","涝":"lào","暖":"nuǎn",
  // ── 动物（扩展）──
  "鹿":"lù","蛇":"shé","狐":"hú","狼":"láng","鹰":"yīng",
  "鸭":"yā","鹅":"é","鸽":"gē","雁":"yàn","鹤":"hè",
  "蜂":"fēng","蚁":"yǐ","蜗":"wō","蝉":"chán","蚕":"cán",
  "螺":"luó","鲸":"jīng","虾":"xiā","蟹":"xiè","龟":"guī",
  "猴":"hóu","狼":"láng","鼠":"shǔ","猫":"māo","豹":"bào",
  "鹦":"yīng","鹉":"wǔ","孔":"kǒng","雀":"què","燕":"yàn",
  // ── 学校 ──
  "书":"shū","本":"běn","笔":"bǐ","纸":"zhǐ","课":"kè",
  "文":"wén","字":"zì","句":"jù","话":"huà","题":"tí",
  "室":"shì","校":"xiào","班":"bān","考":"kǎo","试":"shì",
  "成":"chéng","绩":"jì","练":"liàn","功":"gōng","堂":"táng",
  "黑":"hēi","板":"bǎn","粉":"fěn","橡":"xiàng","皮":"pí",
  "尺":"chǐ","作":"zuò","业":"yè","名":"míng","次":"cì",
  "数":"shù","算":"suàn","英":"yīng","科":"kē","体":"tǐ",
  "育":"yù","音":"yīn","乐":"yuè","美":"měi","术":"shù",
  "史":"shǐ","地":"dì","理":"lǐ","化":"huà","生":"shēng",
  "运":"yùn","动":"dòng","操":"cāo","图":"tú","馆":"guǎn",
  "预":"yù","复":"fù","读":"dú","抄":"chāo","背":"bèi",
  "听":"tīng","说":"shuō","写":"xiě","练":"liàn","用":"yòng",
  // ── 颜色 ──
  "红":"hóng","黄":"huáng","蓝":"lán","绿":"lǜ","白":"bái",
  "黑":"hēi","橙":"chéng","紫":"zǐ","粉":"fěn","金":"jīn",
  "银":"yín","灰":"huī","棕":"zōng","色":"sè","透":"tòu",
  // ── 形容词 ──
  "大":"dà","多":"duō","少":"shǎo","长":"cháng","短":"duǎn",
  "高":"gāo","低":"dī","胖":"pàng","瘦":"shòu","快":"kuài",
  "慢":"màn","远":"yuǎn","近":"jìn","新":"xīn","旧":"jiù",
  "好":"hǎo","坏":"huài","冷":"lěng","热":"rè","左":"zuǒ",
  "右":"yòu","前":"qián","后":"hòu","中":"zhōng","外":"wài",
  "间":"jiān","边":"biān","上":"shàng","下":"xià","内":"nèi",
  "方":"fāng","圆":"yuán","正":"zhèng","平":"píng","弯":"wān",
  "直":"zhí","细":"xì","粗":"cū","宽":"kuān","窄":"zhǎi",
  "亮":"liàng","暗":"àn","美":"měi","丑":"chǒu","香":"xiāng",
  "臭":"chòu","甜":"tián","苦":"kǔ","咸":"xián","辣":"là",
  "软":"ruǎn","硬":"yìng","轻":"qīng","重":"zhòng","满":"mǎn",
  "空":"kōng","全":"quán","完":"wán","整":"zhěng","齐":"qí",
  "通":"tōng","顺":"shùn","流":"liú","利":"lì","畅":"chàng",
  "漂":"piào","亮":"liàng","活":"huó","泼":"pō","聪":"cōng",
  "慧":"huì","善":"shàn","良":"liáng","诚":"chéng","实":"shí",
  "严":"yán","格":"gé","真":"zhēn","假":"jiǎ","虚":"xū",
  "勇":"yǒng","敢":"gǎn","勤":"qín","懒":"lǎn","忙":"máng",
  "闲":"xián","急":"jí","缓":"huǎn","稳":"wěn","乱":"luàn",
  "静":"jìng","动":"dòng","活":"huó","死":"sǐ","生":"shēng",
  "鲜":"xiān","旧":"jiù","古":"gǔ","现":"xiàn","代":"dài",
  "先":"xiān","进":"jìn","落":"luò","后":"hòu","传":"chuán",
  "统":"tǒng","普":"pǔ","特":"tè","别":"bié","般":"bān",
  "奇":"qí","妙":"miào","神":"shén","秘":"mì","趣":"qù",
  "味":"wèi","精":"jīng","彩":"cǎi","壮":"zhuàng","观":"guān",
  // ── 时间 ──
  "今":"jīn","昨":"zuó","早":"zǎo","晚":"wǎn","候":"hòu",
  "分":"fēn","秒":"miǎo","刻":"kè","点":"diǎn","周":"zhōu",
  "节":"jié","假":"jiǎ","期":"qī","时":"shí","刚":"gāng",
  "已":"yǐ","还":"hái","将":"jiāng","曾":"céng","以":"yǐ",
  "午":"wǔ","夜":"yè","旦":"dàn","暮":"mù","黄":"huáng",
  "昏":"hūn","黎":"lí","明":"míng","终":"zhōng","始":"shǐ",
  "初":"chū","末":"mò","首":"shǒu","尾":"wěi","总":"zǒng",
  // ── 虚词 ──
  "的":"de","了":"le","和":"hé","也":"yě","都":"dōu",
  "就":"jiù","从":"cóng","到":"dào","对":"duì","很":"hěn",
  "太":"tài","更":"gèng","最":"zuì","非":"fēi","常":"cháng",
  "又":"yòu","再":"zài","只":"zhǐ","经":"jīng","着":"zhe",
  "如":"rú","但":"dàn","因":"yīn","所":"suǒ","虽":"suī",
  "然":"rán","而":"ér","且":"qiě","之":"zhī","于":"yú",
  "等":"děng","或":"huò","与":"yǔ","及":"jí","若":"ruò",
  "则":"zé","即":"jí","并":"bìng","每":"měi","另":"lìng",
  "当":"dāng","某":"mǒu","样":"yàng","种":"zhǒng","个":"gè",
  "例":"lì","总":"zǒng","首":"shǒu","其":"qí","次":"cì",
  "此":"cǐ","外":"wài","内":"nèi","上":"shàng","下":"xià",
  "故":"gù","使":"shǐ","因":"yīn","此":"cǐ","由":"yóu",
  "于":"yú","是":"shì","可":"kě","以":"yǐ","便":"biàn",
  "从":"cóng","而":"ér","不":"bù","仅":"jǐn","还":"hái",
  // ── 身体 ──
  "头":"tóu","手":"shǒu","脚":"jiǎo","眼":"yǎn","睛":"jīng",
  "耳":"ěr","朵":"duǒ","鼻":"bí","嘴":"zuǐ","口":"kǒu",
  "脸":"liǎn","心":"xīn","身":"shēn","体":"tǐ","腿":"tuǐ",
  "肚":"dù","背":"bèi","肩":"jiān","腰":"yāo","指":"zhǐ",
  "发":"fà","眉":"méi","毛":"máo","牙":"yá","齿":"chǐ",
  "骨":"gǔ","血":"xuè","汗":"hàn","泪":"lèi","气":"qì",
  "皮":"pí","肤":"fū","胸":"xiōng","腹":"fù","颈":"jǐng",
  "膝":"xī","踝":"huái","臂":"bì","掌":"zhǎng","拳":"quán",
  // ── 生活 ──
  "门":"mén","窗":"chuāng","桌":"zhuō","椅":"yǐ","床":"chuáng",
  "饭":"fàn","菜":"cài","茶":"chá","路":"lù","车":"chē",
  "船":"chuán","机":"jī","脑":"nǎo","网":"wǎng","店":"diàn",
  "楼":"lóu","房":"fáng","院":"yuàn","园":"yuán","街":"jiē",
  "市":"shì","桥":"qiáo","城":"chéng","镇":"zhèn","村":"cūn",
  "田":"tián","超":"chāo","购":"gòu","物":"wù","品":"pǐn",
  "米":"mǐ","面":"miàn","肉":"ròu","蛋":"dàn","油":"yóu",
  "盐":"yán","糖":"táng","壶":"hú","碗":"wǎn","盘":"pán",
  "锅":"guō","刀":"dāo","筷":"kuài","勺":"sháo","杯":"bēi",
  "瓶":"píng","盒":"hé","袋":"dài","筐":"kuāng","篮":"lán",
  "饺":"jiǎo","包":"bāo","糕":"gāo","饼":"bǐng","粥":"zhōu",
  "汤":"tāng","醋":"cù","酱":"jiàng","辣":"là","甜":"tián",
  "衣":"yī","裤":"kù","裙":"qún","帽":"mào","袜":"wà",
  "鞋":"xié","带":"dài","扣":"kòu","拉":"lā","链":"liàn",
  "灯":"dēng","笼":"lóng","钟":"zhōng","表":"biǎo","镜":"jìng",
  "台":"tái","架":"jià","柜":"guì","箱":"xiāng","包":"bāo",
  "图":"tú","馆":"guǎn","博":"bó","港":"gǎng","场":"chǎng",
  "区":"qū","厂":"chǎng","局":"jú","站":"zhàn","所":"suǒ",
  "所":"suǒ","处":"chù","地":"dì","点":"diǎn","位":"wèi",
  // ── 情感 ──
  "高":"gāo","兴":"xīng","难":"nán","气":"qì","害":"hài",
  "怕":"pà","悲":"bēi","乐":"lè","幸":"xìng","福":"fú",
  "痛":"tòng","安":"ān","静":"jìng","忙":"máng","累":"lèi",
  "困":"kùn","渴":"kě","饿":"è","暖":"nuǎn","舒":"shū",
  "适":"shì","丽":"lì","快":"kuài","自":"zì","由":"yóu",
  "烦":"fán","愁":"chóu","怒":"nù","惊":"jīng","喜":"xǐ",
  "羞":"xiū","嫉":"jí","妒":"dù","怜":"lián","爱":"ài",
  "恨":"hèn","惜":"xī","怀":"huái","念":"niàn","思":"sī",
  "愿":"yuàn","望":"wàng","盼":"pàn","期":"qī","待":"dài",
  "感":"gǎn","激":"jī","谢":"xiè","佩":"pèi","服":"fú",
  // ── 语气词 ──
  "啊":"a","吧":"ba","呢":"ne","哦":"ó","哈":"hā","哇":"wa",
  "喂":"wèi","嗯":"ng","呀":"ya","嘛":"ma","啦":"la","哟":"yō",
  // ── 其他常用 ──
  "没":"méi","力":"lì","主":"zhǔ","现":"xiàn","形":"xíng",
  "重":"zhòng","两":"liǎng","全":"quán","处":"chù",
  "部":"bù","几":"jǐ","真":"zhēn","事":"shì",
  "活":"huó","立":"lì","达":"dá","命":"mìng","法":"fǎ",
  "行":"xíng","国":"guó","产":"chǎn","先":"xiān","里":"lǐ",
  "思":"sī","温":"wēn","景":"jǐng","秀":"xiù","户":"hù",
  "丰":"fēng","收":"shōu","劳":"láo","歌":"gē",
  "声":"shēng","调":"diào","词":"cí","语":"yǔ",
  "诗":"shī","情":"qíng","第":"dì","章":"zhāng",
  "规":"guī","律":"lǜ","则":"zé","例":"lì","标":"biāo",
  "准":"zhǔn","确":"què","对":"duì","错":"cuò","差":"chà",
  "题":"tí","答":"dá","案":"àn","问":"wèn","解":"jiě",
  "法":"fǎ","式":"shì","步":"bù","骤":"zhòu","过":"guò",
  "程":"chéng","方":"fāng","向":"xiàng","目":"mù","的":"de",
  "标":"biāo","志":"zhì","记":"jì","号":"hào","符":"fú",
  "点":"diǎn","线":"xiàn","面":"miàn","体":"tǐ","形":"xíng",
  "图":"tú","表":"biǎo","格":"gé","框":"kuàng","圈":"quān",
  "条":"tiáo","件":"jiàn","套":"tào","块":"kuài","座":"zuò",
  "栋":"dòng","辆":"liàng","双":"shuāng","对":"duì","张":"zhāng",
  "页":"yè","行":"háng","列":"liè","排":"pái","层":"céng",
  "棵":"kē","束":"shù","株":"zhū","粒":"lì","滴":"dī",
  "片":"piàn","朵":"duǒ","声":"shēng","道":"dào","番":"fān",
  "遍":"biàn","次":"cì","回":"huí","趟":"tàng","段":"duàn",

  // ── 高频补充（品德/品质）──
  "礼":"lǐ","德":"dé","智":"zhì","义":"yì","仁":"rén",
  "忠":"zhōng","孝":"xiào","廉":"lián","耻":"chǐ","恶":"è",
  "邪":"xié","贵":"guì","谦":"qiān","荣":"róng","誉":"yù",
  "奖":"jiǎng","珍":"zhēn","柔":"róu","朗":"lǎng",
  "慈":"cí","祥":"xiáng","幽":"yōu","默":"mò","欣":"xīn",
  "培":"péi","养":"yǎng","育":"yù",
  // ── 副词（叙事常用）──
  "忽":"hū","突":"tū","渐":"jiàn","仔":"zǐ","使":"shǐ",
  "仅":"jǐn","既":"jì","况":"kuàng","竟":"jìng","居":"jū",
  "倒":"dào","反":"fǎn","偏":"piān","尽":"jǐn","却":"què",
  "才":"cái","刚":"gāng","未":"wèi","曾":"céng","约":"yuē",
  "共":"gòng","均":"jūn","余":"yú","凡":"fán",
  // ── 动词（叙事/行为）──
  "越":"yuè","跨":"kuà","踏":"tà","招":"zhāo","唤":"huàn",
  "喊":"hǎn","碎":"suì","破":"pò","裂":"liè","折":"zhé",
  "毁":"huǐ","灭":"miè","救":"jiù","援":"yuán","防":"fáng",
  "卫":"wèi","寻":"xún","觅":"mì","扑":"pū","扶":"fú",
  "捕":"bǔ","授":"shòu","携":"xié","纷":"fēn","闯":"chuǎng",
  "窜":"cuàn","闯":"chuǎng","赶":"gǎn","奔":"bēn","冲":"chōng",
  "涌":"yǒng","流":"liú","淌":"tǎng","滴":"dī","溅":"jiàn",
  "渗":"shèn","蒸":"zhēng","降":"jiàng","飘":"piāo","吹":"chuī",
  "奏":"zòu","弹":"tán","拨":"bō","奋":"fèn","搏":"bó",
  "拼":"pīn","争":"zhēng","竞":"jìng","赢":"yíng","输":"shū",
  "胜":"shèng","败":"bài","战":"zhàn","取":"qǔ","奉":"fèng",
  "献":"xiàn","牺":"xī","嗅":"xiù","尝":"cháng","碰":"pèng",
  "撞":"zhuàng","踩":"cǎi","闻":"wén","射":"shè","映":"yìng",
  "闪":"shǎn","耀":"yào","震":"zhèn","鸣":"míng","啼":"tí",
  // ── 形容词（叙事/描写）──
  "辉":"huī","煌":"huáng","灿":"càn","烂":"làn",
  "艳":"yàn","鲜":"xiān","耀":"yào","闪":"shǎn",
  "壮":"zhuàng","阔":"kuò","豪":"háo","迈":"mài",
  "英":"yīng","雄":"xióng","烈":"liè","忠":"zhōng",
  "廉":"lián","奋":"fèn","刚":"gāng","毅":"yì",
  "坚":"jiān","韧":"rèn","顽":"wán","强":"qiáng",
  "雄":"xióng","伟":"wěi","崇":"chóng","高":"gāo",
  // ── 植物/自然 ──
  "桃":"táo","杏":"xìng","桂":"guì","柳":"liǔ",
  "杨":"yáng","樱":"yīng","枫":"fēng","槐":"huái",
  "榕":"róng","竹":"zhú","豆":"dòu","麦":"mài",
  "禾":"hé","稻":"dào","粮":"liáng","蔬":"shū",
  "苔":"tái","藻":"zǎo","蕨":"jué","苍":"cāng",
  // ── 天文/地理 ──
  "洋":"yáng","陆":"lù","峡":"xiá","盆":"pén",
  "泰":"tài","峨":"é","庭":"tíng","洞":"dòng",
  "京":"jīng","州":"zhōu","省":"shěng","县":"xiàn",
  "乡":"xiāng","宙":"zhòu","宇":"yǔ","航":"háng",
  "轨":"guǐ","道":"dào","际":"jì",
  // ── 天气/气候 ──
  "阴":"yīn","雾":"wù","霜":"shuāng","露":"lù",
  "霞":"xiá","台":"tái","旱":"hàn","涝":"lào",
  // ── 材料/物质 ──
  "铁":"tiě","铜":"tóng","钢":"gāng","铝":"lǚ",
  "玉":"yù","玻":"bō","璃":"lí","陶":"táo","瓷":"cí",
  "棉":"mián","革":"gé","核":"hé","矿":"kuàng",
  // ── 人物/职业/称谓 ──
  "员":"yuán","者":"zhě","士":"shì","将":"jiàng",
  "帅":"shuài","令":"lìng","帜":"zhì","徽":"huī",
  "妇":"fù","幼":"yòu","婴":"yīng","翁":"wēng",
  "祖":"zǔ","宗":"zōng","裔":"yì",
  // ── 学习/文学 ──
  "篇":"piān","卷":"juǎn","册":"cè","页":"yè","行":"háng",
  "描":"miáo","叙":"xù","述":"shù","析":"xī",
  "归":"guī","纳":"nà","概":"gài","括":"kuò",
  "阅":"yuè","赏":"shǎng","积":"jī","累":"lěi",
  "背":"bèi","默":"mò","抄":"chāo","誊":"téng",
  // ── 生产/农业 ──
  "耕":"gēng","播":"bō","割":"gē","牧":"mù",
  "渔":"yú","猎":"liè","灌":"guàn","溉":"gài",
  // ── 历史/文化 ──
  "历":"lì","朝":"cháo","世":"shì","纪":"jì",
  "元":"yuán","器":"qì","械":"xiè","技":"jì",
  "俗":"sú","统":"tǒng","族":"zú","旗":"qí",
  // ── 身体感受 ──
  "疼":"téng","酸":"suān","麻":"má","痒":"yǎng",
  "饥":"jī","晕":"yūn","呕":"ǒu","咳":"ké",
  // ── 艺术 ──
  "艺":"yì","舞":"wǔ","歌":"gē","唱":"chàng",
  "画":"huà","诗":"shī","词":"cí","曲":"qǔ",
  // ── 建筑/场所 ──
  "宫":"gōng","殿":"diàn","庙":"miào","寺":"sì",
  "塔":"tǎ","亭":"tíng","廊":"láng","阁":"gé",
  "厅":"tīng","堂":"táng","室":"shì","屋":"wū",
  // ── 工具/器物 ──
  "锤":"chuí","凿":"záo","锄":"chú","犁":"lí",
  "斧":"fǔ","锯":"jù","钻":"zuān","针":"zhēn",
  "线":"xiàn","绳":"shéng","链":"liàn","钩":"gōu",
  // ── 形状/几何 ──
  "球":"qiú","锥":"zhuī","柱":"zhù","棱":"léng",
  "弧":"hú","径":"jìng","周":"zhōu","积":"jī",
  // ── 数学/计量 ──
  "斤":"jīn","克":"kè","升":"shēng","毫":"háo",
  "厘":"lí","寸":"cùn","丈":"zhàng","亩":"mǔ",
  "吨":"dūn","倍":"bèi","除":"chú","减":"jiǎn",
  // ── 生活更多 ──
  "巾":"jīn","帕":"pà","膏":"gāo","皂":"zào",
  "梳":"shū","毯":"tǎn","绒":"róng","锁":"suǒ",
  "钥":"yào","帘":"lián","幕":"mù","橱":"chú",
  // ── 常用结构词 ──
  "顶":"dǐng","底":"dǐ","旁":"páng","侧":"cè",
  "端":"duān","央":"yāng","极":"jí","甚":"shèn",
  "尤":"yóu","凡":"fán","即":"jí","似":"sì",
};

/* ══════════════════════════════════════════════════  STATE  ══ */

let currentUser  = '';
let currentMode  = 'basic';        // 'basic' | 'pinyin' | 'reading'
let sentences    = [];
let seqIdx       = 0;
let usedIdx      = [];
let targetChars  = [];             // NFC-normalised array of chars
let sentTexts    = [];             // individual sentence strings (for TTS)
let sentBounds   = [];             // index of last char of each sentence
let sentSpoken   = new Set();      // which sentences have been auto-spoken
let isComposing  = false;
let roundActive  = false;
let flipDone     = false;
let ttsActive    = false;

// Timer state
let typingStartTime = null;
let statsTimerID    = null;

// Sound state
let soundEnabled  = true;
let _actx         = null;
let _lastSfxMs    = 0;
let prevInputLen  = 0;

/* ══════════════════════════════════════════════════  SOUND ENGINE  ══ */

function _ac() {
  if (!_actx) _actx = new (window.AudioContext || window.webkitAudioContext)();
  if (_actx.state === 'suspended') _actx.resume();
  return _actx;
}

// Single oscillator tone
function _osc(freq, type, dur, vol, t) {
  const ctx = _ac(), now = t ?? ctx.currentTime;
  const osc = ctx.createOscillator(), g = ctx.createGain();
  osc.connect(g); g.connect(ctx.destination);
  osc.type = type; osc.frequency.setValueAtTime(freq, now);
  g.gain.setValueAtTime(vol, now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  osc.start(now); osc.stop(now + dur + 0.02);
}

// Band-passed white noise burst
function _noise(dur, f0, f1, vol, t) {
  const ctx = _ac(), now = t ?? ctx.currentTime;
  const sr = ctx.sampleRate;
  const buf = ctx.createBuffer(1, Math.ceil(sr * dur), sr);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource(); src.buffer = buf;
  const filt = ctx.createBiquadFilter();
  filt.type = 'bandpass'; filt.Q.value = 1.2;
  filt.frequency.setValueAtTime(f0, now);
  if (f1) filt.frequency.exponentialRampToValueAtTime(f1, now + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol, now);
  g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
  src.connect(filt); filt.connect(g); g.connect(ctx.destination);
  src.start(now);
}

// ── Public SFX ──

function sfxTypeOk() {
  if (!soundEnabled) return;
  const now = Date.now();
  if (now - _lastSfxMs < 40) return;   // throttle rapid input
  _lastSfxMs = now;
  _osc(1100, 'triangle', 0.055, 0.11);
}

function sfxTypeErr() {
  if (!soundEnabled) return;
  const now = Date.now();
  if (now - _lastSfxMs < 60) return;
  _lastSfxMs = now;
  const ctx = _ac(), t = ctx.currentTime;
  _osc(220, 'sawtooth', 0.07, 0.13, t);
  _osc(180, 'sine',     0.09, 0.07, t);
}

function sfxComplete() {
  if (!soundEnabled) return;
  const ctx = _ac(), t = ctx.currentTime;
  [523, 659, 784, 1047].forEach((f, i) => _osc(f, 'sine', 0.22, 0.22, t + i * 0.09));
}

function sfxDrawAppear() {
  if (!soundEnabled) return;
  const ctx = _ac(), t = ctx.currentTime;
  _noise(0.4, 250, 2500, 0.18, t);
  [1047, 1319, 1568].forEach((f, i) => _osc(f, 'sine', 0.18, 0.14, t + 0.05 + i * 0.08));
}

function sfxFlip() {
  if (!soundEnabled) return;
  const ctx = _ac(), t = ctx.currentTime;
  _noise(0.38, 3000, 350, 0.18, t);
  _osc(280, 'sine', 0.18, 0.10, t + 0.32);
}

function sfxReveal(rarity) {
  if (!soundEnabled) return;
  const ctx = _ac(), t = ctx.currentTime;
  if (rarity === 'legendary') {
    const mel  = [523,659,784,523,784,1047,1319,1047];
    const har  = [659,784,988,659,988,1319,1568,1319];
    mel.forEach((f,i) => _osc(f, 'sine', 0.30, 0.24, t + i*0.10));
    har.forEach((f,i) => _osc(f, 'sine', 0.24, 0.10, t + i*0.10 + 0.05));
    _noise(0.6, 1000, 4000, 0.12, t + 0.4);
  } else if (rarity === 'rare') {
    [784,988,1175,1568].forEach((f,i) => _osc(f, 'sine', 0.24, 0.20, t + i*0.09));
    _noise(0.3, 800, 3000, 0.10, t + 0.2);
  } else {
    [1047,1319].forEach((f,i) => _osc(f, 'sine', 0.20, 0.18, t + i*0.10));
  }
}

// ── Mute toggle ──

function initSound() {
  soundEnabled = LS.get('ctcard_sound', true);
  _updateMuteBtn();
}

function toggleSound() {
  soundEnabled = !soundEnabled;
  LS.set('ctcard_sound', soundEnabled);
  _updateMuteBtn();
}

function _updateMuteBtn() {
  const btn = $('mute-btn');
  if (btn) btn.textContent = soundEnabled ? '🔊' : '🔇';
}

/* ══════════════════════════════════════════════════  UTILS  ══ */

const $ = id => document.getElementById(id);
const LS = {
  get(k, d) { try { const v=localStorage.getItem(k); return v===null?d:JSON.parse(v); } catch{return d;} },
  set(k, v) { localStorage.setItem(k, JSON.stringify(v)); },
};
function uk(f)         { return `ctcard_${currentUser}_${f}`; }
function getStars()    { return LS.get(uk('stars'),   0);  }
function getDones()    { return LS.get(uk('dones'),   0);  }
function getErrs()     { return LS.get(uk('errs'),   {}); }
function getColl()     { return LS.get(uk('coll'),   {}); }
function setStars(n)   { LS.set(uk('stars'),  n); }
function setDones(n)   { LS.set(uk('dones'),  n); }
function setErrs(m)    { LS.set(uk('errs'),   m); }
function setColl(c)    { LS.set(uk('coll'),   c); }
function esc(s)        { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${m}:${s.toString().padStart(2,'0')}`;
}

/* ── Card ID helpers ── */
function getCardId(card) {
  if (card.isImage) return `img_${card.imgPath.replace(/[^a-z0-9]/gi,'_')}`;
  return card.id;
}

/* ── Total card counts (emoji + image pools) ── */
function getAllCardDefs() {
  const all = [];
  CARDS.forEach(c => all.push({ ...c, collId: c.id, isImage: false }));
  ['common','rare','legendary'].forEach(r => {
    (SYSTEM_POOL[r]||[]).forEach(imgPath => {
      all.push({ rarity:r, collId:`img_${imgPath.replace(/[^a-z0-9]/gi,'_')}`, imgPath, poolType:'system', isImage:true });
    });
    (CUSTOM_POOL[r]||[]).forEach(imgPath => {
      all.push({ rarity:r, collId:`img_${imgPath.replace(/[^a-z0-9]/gi,'_')}`, imgPath, poolType:'custom',  isImage:true });
    });
  });
  return all;
}

function refreshStats() {
  const col  = getColl();
  const all  = getAllCardDefs();
  const owned = all.filter(c => (col[c.collId]||0) > 0).length;
  $('star-count').textContent = getStars();
  $('done-count').textContent = getDones();
  $('card-count').textContent = `${owned}/${all.length}`;
  $('coll-badge').textContent = `已获得 ${owned} / ${all.length} 张`;
}

/* ══════════════════════════════════════════════════  LOGIN  ══ */

$('login-btn').addEventListener('click', doLogin);
$('name-input').addEventListener('keydown', e => { if (e.key === 'Enter') doLogin(); });

$('mute-btn').addEventListener('click', toggleSound);
$('logout-btn').addEventListener('click', doLogout);
$('reset-btn').addEventListener('click', doReset);

function doReset() {
  if (!confirm(`确定要清空「${currentUser}」的所有记录吗？\n（星星、完成次数、卡牌收藏、易错字）`)) return;
  setStars(0); setDones(0); setErrs({}); setColl({});
  refreshStats();
  renderCollection();
  $('reset-btn').textContent = '已清空 ✓';
  setTimeout(() => { $('reset-btn').textContent = '清空记录 🗑️'; }, 2000);
}

function doLogout() {
  stopTTS();
  stopStatsTimer();
  if (kbActive) stopKbRound();
  if (enRoundActive) { stopEnTimer(); enRoundActive = false; }
  typingStartTime = null;
  roundActive     = false;
  currentUser     = '';
  // Reset UI back to login screen
  $('app').classList.add('hidden');
  $('login-panel').classList.remove('hidden');
  $('name-input').value = '';
  $('name-input').focus();
  // Reset training view in case mid-round
  $('training-sec').classList.add('hidden');
  $('text-input-sec').classList.remove('hidden');
  $('score-card').classList.add('hidden');
  $('rt-stats').classList.add('hidden');
  $('draw-overlay').classList.add('hidden');
}

function doLogin() {
  const name = $('name-input').value.trim();
  if (!name) { $('name-input').focus(); return; }
  currentUser = name;
  $('login-panel').classList.add('hidden');
  $('app').classList.remove('hidden');
  $('greeting').textContent = `👋 你好，${name}！`;
  initSound();
  refreshStats();
  renderCollection();
}

/* ══════════════════════════════════════════════════  TAB NAV  ══ */

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));
    btn.classList.add('active');
    $(`tab-${btn.dataset.tab}`).classList.remove('hidden');
    if (btn.dataset.tab === 'collection') renderCollection();
  });
});

function switchToCollection() {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-pane').forEach(p => p.classList.add('hidden'));
  document.querySelector('[data-tab="collection"]').classList.add('active');
  $('tab-collection').classList.remove('hidden');
  renderCollection();
}

/* ══════════════════════════════════════════════════  MODE SELECTOR  ══ */

const MODE_HINTS = {
  basic:   '完成练习后可以抽取卡牌！',
  pinyin:  '每个汉字上方会显示拼音，帮助你学习读音。',
  reading: '打完每句话会自动朗读，边打边听！请确保开启音量。',
};

document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMode = btn.dataset.mode;
    $('mode-hint').textContent = MODE_HINTS[currentMode];
    if (roundActive) renderTarget([...$('type-input').value]);
    updateSpeakBtnVisibility();
    stopTTS();
  });
});

function updateSpeakBtnVisibility() {
  const btn = $('speak-btn');
  if (!btn) return;
  btn.style.fontWeight = currentMode === 'reading' ? '900' : '700';
}

/* ══════════════════════════════════════════════════  TRAINING  ══ */

$('start-btn').addEventListener('click', startTraining);

function startTraining() {
  const text = $('source-text').value.trim();
  if (!text) { $('source-text').focus(); return; }
  const parsed = text
    .split(/(?<=[。！？!?])/)
    .map(s => s.trim())
    .filter(s => s.length >= 2);
  if (!parsed.length) { alert('请粘贴包含句号（。！？）的中文课文。'); return; }
  sentences = parsed;
  seqIdx    = 0;
  usedIdx   = [];
  $('text-input-sec').classList.add('hidden');
  $('training-sec').classList.remove('hidden');
  loadRound();
}

function getOrderMode() {
  return document.querySelector('input[name="order"]:checked').value;
}

function pickSentences() {
  const n    = Math.min(3, sentences.length);
  const mode = getOrderMode();
  if (mode === 'sequential') {
    const picks = [];
    for (let i = 0; i < n; i++) picks.push(sentences[seqIdx++ % sentences.length]);
    return picks;
  }
  if (usedIdx.length + n > sentences.length) usedIdx = [];
  const pool   = sentences.map((_,i) => i).filter(i => !usedIdx.includes(i));
  const chosen = pool.sort(() => Math.random() - .5).slice(0, n);
  usedIdx.push(...chosen);
  return chosen.map(i => sentences[i]);
}

function loadRound() {
  stopTTS();
  stopStatsTimer();
  typingStartTime = null;

  const picks = pickSentences();

  sentTexts  = picks.map(s => s.replace(/\s+/g, '').normalize('NFC'));
  sentBounds = [];
  sentSpoken = new Set();
  let pos    = 0;
  sentTexts.forEach(sent => {
    pos += [...sent].length;
    sentBounds.push(pos - 1);
  });
  targetChars = [...sentTexts.join('')];

  const inp = $('type-input');
  inp.value    = '';
  inp.disabled = false;
  prevInputLen = 0;
  $('score-card').classList.add('hidden');
  $('rt-stats').classList.add('hidden');
  $('rts-time').textContent = '0:00';
  $('rts-cpm').textContent  = '0';
  $('rts-acc').textContent  = '--%';
  $('rts-errs').textContent = '0';
  $('acc-badge').textContent = '准确率：--';
  roundActive  = true;

  renderTarget([]);
  inp.focus();
}

/* ── Render target display ── */

function renderTarget(ic) {
  const display = $('target-display');

  if (currentMode === 'basic') {
    display.classList.remove('has-pinyin');
    display.innerHTML = targetChars.map((ch, i) => {
      const cls = i < ic.length
        ? ((ic[i]||'').normalize('NFC') === ch ? 'correct' : 'wrong')
        : (i === ic.length ? 'current' : 'pending');
      const s = ch==='&'?'&amp;':ch==='<'?'&lt;':ch==='>'?'&gt;':ch;
      return `<span class="char ${cls}">${s}</span>`;
    }).join('');

  } else {
    display.classList.add('has-pinyin');
    display.innerHTML = targetChars.map((ch, i) => {
      const cls = i < ic.length
        ? ((ic[i]||'').normalize('NFC') === ch ? 'correct' : 'wrong')
        : (i === ic.length ? 'current' : 'pending');
      const py  = PINYIN[ch] || '·';   // never blank — fallback to middle dot
      const s   = ch==='&'?'&amp;':ch==='<'?'&lt;':ch==='>'?'&gt;':ch;
      return `<span class="char-block ${cls}" data-i="${i}">` +
               `<span class="py">${esc(py)}</span>` +
               `<span class="hz">${s}</span>` +
             `</span>`;
    }).join('');
  }
}

/* ── Accuracy & error count ── */

function calcAcc(ic) {
  if (!targetChars.length) return 0;
  let ok = 0;
  targetChars.forEach((ch, i) => { if ((ic[i]||'').normalize('NFC') === ch) ok++; });
  return Math.round(ok / targetChars.length * 100);
}

function countErrors(ic) {
  let errs = 0;
  targetChars.forEach((ch, i) => {
    if (i < ic.length && (ic[i]||'').normalize('NFC') !== ch) errs++;
  });
  return errs;
}

/* ══════════════════════════════════════════════════  TIMER & STATS  ══ */

function startStatsTimer() {
  if (typingStartTime) return;
  typingStartTime = Date.now();
  $('rt-stats').classList.remove('hidden');
  statsTimerID = setInterval(updateRtStats, 1000);
}

function stopStatsTimer() {
  clearInterval(statsTimerID);
  statsTimerID = null;
}

function updateRtStats() {
  if (!typingStartTime) return;
  const elapsed = (Date.now() - typingStartTime) / 1000;
  const ic      = [...($('type-input').value || '')];
  const mins    = elapsed / 60;
  const cpm     = mins > 0.01 ? Math.round(ic.length / mins) : 0;
  const acc     = calcAcc(ic);
  const errs    = countErrors(ic);

  $('rts-time').textContent = formatTime(elapsed);
  $('rts-cpm').textContent  = cpm;
  $('rts-acc').textContent  = acc + '%';
  $('rts-errs').textContent = errs;
}

/* ── IME-safe input listeners ── */

const typeInputEl = $('type-input');
typeInputEl.addEventListener('compositionstart', () => { isComposing = true; });
typeInputEl.addEventListener('compositionend',   () => { isComposing = false; onInput(); });
typeInputEl.addEventListener('input',            () => { if (!isComposing) onInput(); });

function onInput() {
  if (!roundActive) return;
  const ic = [...typeInputEl.value];

  // Start timer on first keystroke
  if (ic.length > 0 && !typingStartTime) startStatsTimer();

  // Keystroke sound (only when adding chars, not deleting)
  if (ic.length > prevInputLen && ic.length <= targetChars.length) {
    const idx = ic.length - 1;
    const ok  = (ic[idx]||'').normalize('NFC') === targetChars[idx];
    ok ? sfxTypeOk() : sfxTypeErr();
  }
  prevInputLen = ic.length;

  renderTarget(ic);
  updateRtStats();
  $('acc-badge').textContent = `准确率：${calcAcc(ic)}%`;

  if (currentMode === 'reading') checkSentenceSpeech(ic);

  if (ic.length >= targetChars.length && targetChars.every((ch, i) => ic[i] === ch)) {
    completeRound();
  }
}

/* ── Reading mode: auto-speak completed sentences ── */

function checkSentenceSpeech(ic) {
  sentBounds.forEach((boundary, idx) => {
    if (sentSpoken.has(idx)) return;
    if (ic.length <= boundary) return;
    const sentStart = idx === 0 ? 0 : sentBounds[idx - 1] + 1;
    let allOk = true;
    for (let i = sentStart; i <= boundary; i++) {
      if ((ic[i]||'').normalize('NFC') !== targetChars[i]) { allOk = false; break; }
    }
    if (allOk) { sentSpoken.add(idx); speakSentence(sentTexts[idx], idx); }
  });
}

/* ── Submit / next / back ── */

$('submit-btn').addEventListener('click', () => {
  if (roundActive && typeInputEl.value.length > 0) completeRound();
});

$('next-btn').addEventListener('click', loadRound);

$('back-btn').addEventListener('click', () => {
  stopTTS();
  stopStatsTimer();
  typingStartTime = null;
  $('training-sec').classList.add('hidden');
  $('text-input-sec').classList.remove('hidden');
  seqIdx = 0; usedIdx = []; roundActive = false;
  $('target-display').classList.remove('has-pinyin');
});

$('speak-btn').addEventListener('click', () => {
  if (!roundActive) return;
  if (ttsActive) { stopTTS(); return; }
  speakFull(targetChars.join(''));
});

/* ── Complete a round ── */

function completeRound() {
  roundActive = false;
  typeInputEl.disabled = true;
  stopTTS();
  stopStatsTimer();

  const elapsed = typingStartTime ? (Date.now() - typingStartTime) / 1000 : 0;
  const ic      = [...typeInputEl.value];
  const acc     = calcAcc(ic);
  const errCount = countErrors(ic);
  const mins    = elapsed / 60;
  const cpm     = (mins > 0.01 && targetChars.length > 0) ? Math.round(targetChars.length / mins) : 0;

  // Track per-character errors
  const em = getErrs();
  targetChars.forEach((ch, i) => { if ((ic[i]||'').normalize('NFC') !== ch) em[ch] = (em[ch]||0)+1; });
  setErrs(em);

  setStars(getStars() + 1);
  setDones(getDones() + 1);

  sfxComplete();

  const card  = drawCard();
  const count = addToColl(card);
  refreshStats();

  // Score card
  const emoji = acc===100?'🏆':acc>=80?'🎉':acc>=60?'👍':'💪';
  $('sc-emoji').textContent  = emoji;
  $('sc-title').textContent  = '完成！正在抽卡……';
  $('sc-sub').textContent    = `⭐ ${getStars()} 颗星`;
  $('sc-acc').textContent    = acc + '%';
  $('sc-errs').textContent   = errCount + ' 个';
  $('sc-cpm').textContent    = cpm > 0 ? cpm : '--';
  $('sc-time').textContent   = elapsed > 1 ? formatTime(elapsed) : '--';
  $('score-card').classList.remove('hidden');

  if (currentMode === 'reading') setTimeout(() => speakFull(targetChars.join('')), 400);

  setTimeout(() => showDrawModal(card, count), 800);
}

/* ══════════════════════════════════════════════════  TTS  ══ */

const TTS_SUPPORTED = 'speechSynthesis' in window;

function speakSentence(text, sentIdx) {
  if (!TTS_SUPPORTED) return;
  stopTTS();
  highlightSentence(sentIdx);
  const u  = makeSpeech(text);
  u.onend  = () => { ttsActive = false; clearHighlight(); setSpeakBtnState(false); };
  u.onerror= () => { ttsActive = false; clearHighlight(); setSpeakBtnState(false); };
  ttsActive = true;
  setSpeakBtnState(true);
  window.speechSynthesis.speak(u);
}

function speakFull(text) {
  if (!TTS_SUPPORTED) return;
  stopTTS();
  const u  = makeSpeech(text);
  u.onend  = () => { ttsActive = false; setSpeakBtnState(false); };
  u.onerror= () => { ttsActive = false; setSpeakBtnState(false); };
  ttsActive = true;
  setSpeakBtnState(true);
  window.speechSynthesis.speak(u);
}

function makeSpeech(text) {
  const u    = new SpeechSynthesisUtterance(text);
  u.lang     = 'zh-CN';
  u.rate     = 0.88;
  u.pitch    = 1;
  const voices = window.speechSynthesis.getVoices();
  const zhVoice = voices.find(v => v.lang.startsWith('zh'));
  if (zhVoice) u.voice = zhVoice;
  return u;
}

function stopTTS() {
  if (!TTS_SUPPORTED) return;
  window.speechSynthesis.cancel();
  ttsActive = false;
  clearHighlight();
  setSpeakBtnState(false);
}

function setSpeakBtnState(active) {
  const btn = $('speak-btn');
  if (!btn) return;
  btn.textContent = active ? '⏹ 停止' : '🔊 朗读';
  btn.classList.toggle('speaking', active);
}

function highlightSentence(sentIdx) {
  if (currentMode === 'basic') return;
  const blocks = document.querySelectorAll('.char-block');
  const start  = sentIdx === 0 ? 0 : sentBounds[sentIdx - 1] + 1;
  const end    = sentBounds[sentIdx];
  blocks.forEach(b => {
    const i = Number(b.dataset.i);
    b.classList.toggle('sentence-active', i >= start && i <= end);
  });
}

function clearHighlight() {
  document.querySelectorAll('.char-block.sentence-active')
    .forEach(b => b.classList.remove('sentence-active'));
}

window.speechSynthesis && window.speechSynthesis.addEventListener &&
  window.speechSynthesis.addEventListener('voiceschanged', () => {});

/* ══════════════════════════════════════════════════  CARD DRAW  ══ */

function drawCard() {
  // Rarity
  const roll   = Math.random() * 100;
  const rarity = roll < 5 ? 'legendary' : roll < 30 ? 'rare' : 'common';

  // Check image pools for this rarity
  const hasSys  = (SYSTEM_POOL[rarity]||[]).length > 0;
  const hasCust = (CUSTOM_POOL[rarity]||[]).length > 0;

  if (hasSys || hasCust) {
    let poolType, pool;
    if (hasSys && hasCust) {
      poolType = Math.random() < 0.35 ? 'custom' : 'system';
    } else {
      poolType = hasCust ? 'custom' : 'system';
    }
    pool = poolType === 'custom' ? CUSTOM_POOL[rarity] : SYSTEM_POOL[rarity];
    const imgPath = pool[Math.floor(Math.random() * pool.length)];
    return { rarity, poolType, imgPath, isImage: true };
  }

  // Emoji fallback
  const pool = CARDS.filter(c => c.rarity === rarity);
  const card = pool[Math.floor(Math.random() * pool.length)];
  return { ...card, poolType: 'emoji', isImage: false };
}

function addToColl(card) {
  const col = getColl();
  const id  = getCardId(card);
  col[id]   = (col[id]||0) + 1;
  setColl(col);
  return col[id];
}

/* ══════════════════════════════════════════════════  DRAW MODAL  ══ */

function showDrawModal(card, count) {
  flipDone = false;
  $('card-inner').classList.remove('flipped');

  const front = $('card-front');
  front.className = `card-face card-front rarity-${card.rarity}`;
  front.innerHTML = buildCardFrontHTML(card, count);

  const overlay = $('draw-overlay');
  overlay.className = 'draw-overlay';
  $('sparkle-box').innerHTML = '';
  $('draw-title').textContent = '🎊 恭喜！获得新卡牌！';
  $('flip-hint').classList.remove('hidden');
  $('draw-btns').classList.add('hidden');

  // Pool badge
  const badge = $('pool-badge');
  if (card.isImage) {
    badge.textContent = card.poolType === 'custom' ? '✦ 自定义卡' : '◉ 系统卡';
    badge.className   = `pool-badge pool-badge-${card.poolType}`;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }

  const flip = $('card-flip');
  flip.classList.remove('no-float');
  flip.onclick = () => { if (!flipDone) { flipDone = true; doFlip(card, count); } };

  overlay.classList.remove('hidden');
  sfxDrawAppear();
}

function doFlip(card, count) {
  $('card-flip').classList.add('no-float');
  $('card-inner').classList.add('flipped');
  $('flip-hint').classList.add('hidden');
  sfxFlip();

  setTimeout(() => {
    spawnSparkles(card.rarity);
    sfxReveal(card.rarity);

    if (card.rarity === 'legendary') $('draw-overlay').classList.add('overlay-legendary');
    else if (card.rarity === 'rare') $('draw-overlay').classList.add('overlay-rare');

    const isFirst = count === 1;
    const name    = card.isImage
      ? (card.imgPath.split('/').pop().replace(/\.[^.]+$/,''))
      : card.name;
    let title;
    if      (card.rarity === 'legendary') title = `🌟 传说卡！「${name}」！太厉害了！`;
    else if (card.rarity === 'rare')      title = `✨ 稀有卡！「${name}」！真不错！`;
    else if (isFirst)                     title = `🎉 首次获得「${name}」！`;
    else                                  title = `🎉 又得到「${name}」！`;
    if (count === 3) title += '  ⬆️ 卡牌升级！';
    if (count === 6) title += '  🌟 达到满级！';
    $('draw-title').textContent = title;
    $('draw-btns').classList.remove('hidden');
  }, 800);
}

function spawnSparkles(rarity) {
  const box    = $('sparkle-box');
  box.innerHTML = '';
  const n      = rarity === 'legendary' ? 30 : rarity === 'rare' ? 18 : 10;
  const colors = SPARKLE_COLS[rarity];
  for (let i = 0; i < n; i++) {
    const dot = document.createElement('span');
    dot.className = 'sparkle-dot';
    const sz = 4 + Math.random() * 9;
    dot.style.cssText = [
      `left:${6+Math.random()*88}%`, `top:${6+Math.random()*88}%`,
      `width:${sz}px`, `height:${sz}px`,
      `background:${colors[Math.floor(Math.random()*colors.length)]}`,
      `animation-delay:${(Math.random()*.45).toFixed(2)}s`,
      `animation-duration:${(.7+Math.random()*.7).toFixed(2)}s`,
    ].join(';');
    box.appendChild(dot);
    dot.addEventListener('animationend', () => dot.remove(), { once:true });
  }
}

$('btn-continue').addEventListener('click',  () => $('draw-overlay').classList.add('hidden'));
$('btn-see-coll').addEventListener('click',  () => { $('draw-overlay').classList.add('hidden'); switchToCollection(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') $('draw-overlay').classList.add('hidden'); });

/* ══════════════════════════════════════════════════  CARD FRONT HTML  ══ */

function buildCardFrontHTML(card, count) {
  if (card.isImage) return buildImageCardHTML(card, count);
  const tc       = TYPE_COLOR[card.type] || '#6b7280';
  const upgraded = count >= 3, maxed = count >= 6;
  return `
    <div class="cf-header" style="background:${tc}">
      <span class="cf-name">${esc(card.name)}</span>
      <span class="cf-hp">HP <b>${card.hp}</b></span>
    </div>
    <div class="cf-art">${card.icon}</div>
    <div class="cf-divider"></div>
    <div class="cf-footer">
      <div class="cf-badges">
        <span class="badge-type" style="background:${tc}">${esc(card.type)}</span>
        <span class="badge-rar rar-${card.rarity}">${RARITY_LABEL[card.rarity]}</span>
        ${upgraded ? `<span class="badge-up">${maxed?'★ 满级':'⬆️ 升级'}</span>` : ''}
      </div>
      <p class="cf-desc">${esc(card.desc)}</p>
    </div>`;
}

function buildImageCardHTML(card, count) {
  const upgraded = count >= 3, maxed = count >= 6;
  const fileName = card.imgPath.split('/').pop().replace(/\.[^.]+$/,'');
  return `
    <div class="cf-img-wrap">
      <img src="${card.imgPath}" class="cf-img" alt="${esc(fileName)}"
        onerror="this.parentElement.innerHTML='<div class=cf-img-err>🖼️<br><small>图片加载失败</small></div>'">
    </div>
    <div class="cf-divider"></div>
    <div class="cf-footer">
      <div class="cf-badges">
        <span class="badge-rar rar-${card.rarity}">${RARITY_LABEL[card.rarity]}</span>
        <span class="badge-pool badge-pool-${card.poolType}">${card.poolType==='custom'?'自定义卡':'系统卡'}</span>
        ${upgraded ? `<span class="badge-up">${maxed?'★ 满级':'⬆️ 升级'}</span>` : ''}
      </div>
      <p class="cf-desc">${esc(fileName)}</p>
    </div>`;
}

/* ══════════════════════════════════════════════════  COLLECTION  ══ */

function renderCollection() {
  const col  = getColl();
  const all  = getAllCardDefs();
  const owned = all.filter(c => (col[c.collId]||0) > 0).length;
  $('coll-badge').textContent = `已获得 ${owned} / ${all.length} 张`;
  $('card-count').textContent = `${owned}/${all.length}`;
  $('card-grid').innerHTML = all.map(card => {
    const cnt = col[card.collId] || 0;
    return cnt > 0 ? miniCardHTML(card, cnt) : unknownCardHTML(card);
  }).join('');
}

function miniCardHTML(card, cnt) {
  if (card.isImage) return miniImageCardHTML(card, cnt);
  const tc       = TYPE_COLOR[card.type] || '#6b7280';
  const upgraded = cnt >= 3, maxed = cnt >= 6;
  const upClass  = maxed ? 'mini-maxed' : upgraded ? 'mini-upgraded' : '';
  return `
    <div class="mini-card mini-${card.rarity} ${upClass}" title="${esc(card.name)}">
      <div class="mc-header" style="background:${tc}">
        <span class="mc-name">${esc(card.name)}</span>
        <span class="mc-hp">HP${card.hp}</span>
      </div>
      <div class="mc-art">${card.icon}</div>
      <div class="mc-footer"><p class="mc-desc">${esc(card.desc)}</p></div>
      <span class="mc-count">×${cnt}</span>
      ${upgraded ? `<span class="mc-upbadge">${maxed?'★满级':'★升级'}</span>` : ''}
    </div>`;
}

function miniImageCardHTML(card, cnt) {
  const upgraded = cnt >= 3, maxed = cnt >= 6;
  const upClass  = maxed ? 'mini-maxed' : upgraded ? 'mini-upgraded' : '';
  const fileName = card.imgPath.split('/').pop().replace(/\.[^.]+$/,'');
  return `
    <div class="mini-card mini-${card.rarity} mini-imgcard ${upClass}" title="${esc(fileName)}">
      <div class="mc-img-wrap">
        <img src="${card.imgPath}" class="mc-img" alt="${esc(fileName)}"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex'">
        <div class="mc-img-err" style="display:none">🖼️</div>
      </div>
      <div class="mc-img-footer">
        <span class="badge-rar rar-${card.rarity}">${RARITY_LABEL[card.rarity]}</span>
        ${card.poolType==='custom' ? '<span class="badge-custom">自定义</span>' : ''}
      </div>
      <span class="mc-count">×${cnt}</span>
      ${upgraded ? `<span class="mc-upbadge">${maxed?'★满级':'★升级'}</span>` : ''}
    </div>`;
}

function unknownCardHTML(card) {
  const borders = { common:'#94a3b8', rare:'#8b5cf6', legendary:'#f59e0b' };
  return `<div class="mini-card mini-unknown" style="border-color:${borders[card.rarity]}" title="未获得">
    <span class="mc-unknown">❓</span>
    ${card.isImage ? `<span class="unk-pool">${card.poolType==='custom'?'自':'系'}</span>` : ''}
  </div>`;
}

/* ══════════════════════════════════════════════════  POOL CONFIG UI  ══ */

const POOL_CFG_KEY = 'ctcard_pool_cfg';

function loadPoolCfg() {
  const cfg = LS.get(POOL_CFG_KEY, null);
  if (!cfg) return;
  if (cfg.sc) SYSTEM_POOL.common    = cfg.sc;
  if (cfg.sr) SYSTEM_POOL.rare      = cfg.sr;
  if (cfg.sl) SYSTEM_POOL.legendary = cfg.sl;
  if (cfg.cc) CUSTOM_POOL.common    = cfg.cc;
  if (cfg.cr) CUSTOM_POOL.rare      = cfg.cr;
  if (cfg.cl) CUSTOM_POOL.legendary = cfg.cl;
}

function populatePoolCfgUI() {
  const parsedTo = (arr) => arr.join('\n');
  $('cfg-sc').value = parsedTo(SYSTEM_POOL.common);
  $('cfg-sr').value = parsedTo(SYSTEM_POOL.rare);
  $('cfg-sl').value = parsedTo(SYSTEM_POOL.legendary);
  $('cfg-cc').value = parsedTo(CUSTOM_POOL.common);
  $('cfg-cr').value = parsedTo(CUSTOM_POOL.rare);
  $('cfg-cl').value = parsedTo(CUSTOM_POOL.legendary);
}

function savePoolCfg() {
  const parse = id => $(id).value.split('\n').map(s => s.trim()).filter(Boolean);
  SYSTEM_POOL.common    = parse('cfg-sc');
  SYSTEM_POOL.rare      = parse('cfg-sr');
  SYSTEM_POOL.legendary = parse('cfg-sl');
  CUSTOM_POOL.common    = parse('cfg-cc');
  CUSTOM_POOL.rare      = parse('cfg-cr');
  CUSTOM_POOL.legendary = parse('cfg-cl');
  LS.set(POOL_CFG_KEY, {
    sc: SYSTEM_POOL.common,    sr: SYSTEM_POOL.rare,    sl: SYSTEM_POOL.legendary,
    cc: CUSTOM_POOL.common,    cr: CUSTOM_POOL.rare,    cl: CUSTOM_POOL.legendary,
  });
  refreshStats();
  renderCollection();
}

// Populate textareas when config panel opens
$('pool-cfg-details').addEventListener('toggle', () => {
  if ($('pool-cfg-details').open) populatePoolCfgUI();
});

$('save-pool-cfg').addEventListener('click', () => {
  savePoolCfg();
  $('save-pool-cfg').textContent = '已保存 ✓';
  setTimeout(() => { $('save-pool-cfg').textContent = '保存卡池 💾'; }, 1800);
});

// Load saved config on startup (overrides code defaults if user has saved before)
loadPoolCfg();

/* ══════════════════════════════════════════════════  ERROR MODAL  ══ */

$('err-btn').addEventListener('click', showErrModal);
$('close-err-btn').addEventListener('click', () => $('error-modal').classList.add('hidden'));
$('error-modal').addEventListener('click', e => {
  if (e.target === $('error-modal')) $('error-modal').classList.add('hidden');
});

function showErrModal() {
  const entries = Object.entries(getErrs()).sort((a,b) => b[1]-a[1]).slice(0,24);
  $('error-list').innerHTML = entries.length
    ? entries.map(([ch, n]) => {
        const py = PINYIN[ch]
          ? `<span style="font-size:.7rem;color:#94a3b8;display:block">${esc(PINYIN[ch])}</span>`
          : '';
        return `<div class="err-item">${py}<span class="err-char">${esc(ch)}</span><span class="err-cnt">错 ${n} 次</span></div>`;
      }).join('')
    : '<div class="no-errs">🎉 暂无错误记录，继续加油！</div>';
  $('error-modal').classList.remove('hidden');
}

/* ══════════════════════════════════════════════════  ENGLISH PRACTICE  ══ */

// ── State ──
let enSentences   = [];
let enSeqIdx      = 0;
let enUsedIdx     = [];
let enTargetChars = [];
let enRoundActive = false;
let enStartTime   = null;
let enTimerID     = null;
let enPrevLen     = 0;
let enComposing   = false;

const enTypeInputEl = $('en-type-input');

// ── IME-safe input ──
enTypeInputEl.addEventListener('compositionstart', () => { enComposing = true; });
enTypeInputEl.addEventListener('compositionend',   () => { enComposing = false; onEnInput(); });
enTypeInputEl.addEventListener('input',            () => { if (!enComposing) onEnInput(); });

// ── Buttons ──
$('en-start-btn').addEventListener('click', startEnglishTraining);
$('en-submit-btn').addEventListener('click', () => {
  if (enRoundActive && enTypeInputEl.value.length > 0) completeEnRound();
});
$('en-next-btn').addEventListener('click', loadEnRound);
$('en-back-btn').addEventListener('click', () => {
  stopEnTimer();
  enRoundActive = false;
  $('en-training-sec').classList.add('hidden');
  $('en-input-sec').classList.remove('hidden');
  $('en-score-card').classList.add('hidden');
  $('en-rt-stats').classList.add('hidden');
});

// ── Text parsing ──
function parseEnglishSentences(raw) {
  const parts = raw.split(/(?<=[.!?…])\s+/);
  const cleaned = parts.map(s => s.trim()).filter(s => s.length >= 4);
  if (!cleaned.length && raw.trim().length >= 4) return [raw.trim()];
  return cleaned;
}

function startEnglishTraining() {
  const raw = $('en-source-text').value.trim();
  if (!raw) { $('en-source-text').focus(); return; }
  enSentences = parseEnglishSentences(raw);
  if (!enSentences.length) { alert('Please enter some English text to practice.'); return; }
  enSeqIdx  = 0;
  enUsedIdx = [];
  $('en-input-sec').classList.add('hidden');
  $('en-training-sec').classList.remove('hidden');
  loadEnRound();
}

function pickEnSentences() {
  const n    = Math.min(2, enSentences.length);
  const mode = document.querySelector('input[name="en-order"]:checked').value;
  if (mode === 'sequential') {
    const picks = [];
    for (let i = 0; i < n; i++) picks.push(enSentences[enSeqIdx++ % enSentences.length]);
    return picks;
  }
  if (enUsedIdx.length + n > enSentences.length) enUsedIdx = [];
  const pool   = enSentences.map((_,i) => i).filter(i => !enUsedIdx.includes(i));
  const chosen = pool.sort(() => Math.random() - .5).slice(0, n);
  enUsedIdx.push(...chosen);
  return chosen.map(i => enSentences[i]);
}

function loadEnRound() {
  stopEnTimer();
  enStartTime = null;
  enPrevLen   = 0;

  const picks   = pickEnSentences();
  enTargetChars = [...picks.join(' ')];

  enTypeInputEl.value    = '';
  enTypeInputEl.disabled = false;
  enRoundActive          = true;

  $('en-score-card').classList.add('hidden');
  $('en-rt-stats').classList.add('hidden');
  $('en-rts-time').textContent  = '0:00';
  $('en-rts-cpm').textContent   = '0';
  $('en-rts-acc').textContent   = '--%';
  $('en-rts-errs').textContent  = '0';
  $('en-acc-badge').textContent = '准确率：--';

  renderEnglishTarget([]);
  enTypeInputEl.focus();
}

// ── Render target (spaces shown as · ) ──
function renderEnglishTarget(ic) {
  $('en-target-display').innerHTML = enTargetChars.map((ch, i) => {
    const cls = i < ic.length
      ? (ic[i] === ch ? 'correct' : 'wrong')
      : (i === ic.length ? 'current' : 'pending');
    if (ch === ' ') return `<span class="char en-sp ${cls}">·</span>`;
    const s = ch==='&'?'&amp;':ch==='<'?'&lt;':ch==='>'?'&gt;':ch;
    return `<span class="char ${cls}">${s}</span>`;
  }).join('');
}

// ── Accuracy helpers ──
function calcEnAcc(ic) {
  if (!enTargetChars.length) return 0;
  let ok = 0;
  enTargetChars.forEach((ch, i) => { if (ic[i] === ch) ok++; });
  return Math.round(ok / enTargetChars.length * 100);
}
function countEnErrors(ic) {
  let errs = 0;
  enTargetChars.forEach((ch, i) => { if (i < ic.length && ic[i] !== ch) errs++; });
  return errs;
}

// ── Timer ──
function startEnTimer() {
  if (enStartTime) return;
  enStartTime = Date.now();
  $('en-rt-stats').classList.remove('hidden');
  enTimerID = setInterval(updateEnStats, 1000);
}
function stopEnTimer() {
  clearInterval(enTimerID);
  enTimerID = null;
}
function updateEnStats() {
  if (!enStartTime) return;
  const elapsed = (Date.now() - enStartTime) / 1000;
  const ic      = [...(enTypeInputEl.value || '')];
  const mins    = elapsed / 60;
  $('en-rts-time').textContent  = formatTime(elapsed);
  $('en-rts-cpm').textContent   = mins > 0.01 ? Math.round(ic.length / mins) : 0;
  $('en-rts-acc').textContent   = calcEnAcc(ic) + '%';
  $('en-rts-errs').textContent  = countEnErrors(ic);
}

// ── Input handler ──
function onEnInput() {
  if (!enRoundActive) return;
  const ic = [...enTypeInputEl.value];

  if (ic.length > 0 && !enStartTime) startEnTimer();

  if (ic.length > enPrevLen && ic.length <= enTargetChars.length) {
    const idx = ic.length - 1;
    ic[idx] === enTargetChars[idx] ? sfxTypeOk() : sfxTypeErr();
  }
  enPrevLen = ic.length;

  renderEnglishTarget(ic);
  if (enStartTime) updateEnStats();
  $('en-acc-badge').textContent = `准确率：${calcEnAcc(ic)}%`;

  if (ic.length >= enTargetChars.length && enTargetChars.every((ch, i) => ic[i] === ch)) {
    completeEnRound();
  }
}

// ── Complete round ──
function completeEnRound() {
  enRoundActive = false;
  enTypeInputEl.disabled = true;
  stopEnTimer();

  const elapsed  = enStartTime ? (Date.now() - enStartTime) / 1000 : 0;
  const ic       = [...enTypeInputEl.value];
  const acc      = calcEnAcc(ic);
  const errCount = countEnErrors(ic);
  const mins     = elapsed / 60;
  const cpm      = mins > 0.01 ? Math.round(enTargetChars.length / mins) : 0;

  setStars(getStars() + 1);
  setDones(getDones() + 1);
  sfxComplete();
  const card  = drawCard();
  const count = addToColl(card);
  refreshStats();

  const emoji = acc===100?'🏆':acc>=80?'🎉':acc>=60?'👍':'💪';
  $('en-sc-emoji').textContent = emoji;
  $('en-sc-title').textContent = '完成！正在抽卡……';
  $('en-sc-sub').textContent   = `⭐ ${getStars()} 颗星`;
  $('en-sc-acc').textContent   = acc + '%';
  $('en-sc-errs').textContent  = errCount + ' 个';
  $('en-sc-cpm').textContent   = cpm > 0 ? cpm : '--';
  $('en-sc-time').textContent  = elapsed > 1 ? formatTime(elapsed) : '--';
  $('en-score-card').classList.remove('hidden');
  setTimeout(() => showDrawModal(card, count), 800);
}

/* ══════════════════════════════════════════════════  ENGLISH PRACTICE  ══ */

// ── State ──
let enSentences   = [];
let enSeqIdx      = 0;
let enUsedIdx     = [];
let enTargetChars = [];
let enRoundActive = false;
let enStartTime   = null;
let enTimerID     = null;
let enPrevLen     = 0;
let enComposing   = false;

const enTypeInputEl = $('en-type-input');

// ── IME-safe input ──
enTypeInputEl.addEventListener('compositionstart', () => { enComposing = true; });
enTypeInputEl.addEventListener('compositionend',   () => { enComposing = false; onEnInput(); });
enTypeInputEl.addEventListener('input',            () => { if (!enComposing) onEnInput(); });

// ── Buttons ──
$('en-start-btn').addEventListener('click', startEnglishTraining);
$('en-submit-btn').addEventListener('click', () => {
  if (enRoundActive && enTypeInputEl.value.length > 0) completeEnRound();
});
$('en-next-btn').addEventListener('click', loadEnRound);
$('en-back-btn').addEventListener('click', () => {
  stopEnTimer();
  enRoundActive = false;
  $('en-training-sec').classList.add('hidden');
  $('en-input-sec').classList.remove('hidden');
  $('en-score-card').classList.add('hidden');
  $('en-rt-stats').classList.add('hidden');
});

// Stop English round when switching away from its tab
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (enRoundActive && btn.dataset.tab !== 'english') { stopEnTimer(); enRoundActive = false; }
  });
});

// ── Text parsing ──
function parseEnglishSentences(raw) {
  const parts = raw.split(/(?<=[.!?…])\s+/);
  const cleaned = parts.map(s => s.trim()).filter(s => s.length >= 4);
  if (!cleaned.length && raw.trim().length >= 4) return [raw.trim()];
  return cleaned;
}

function startEnglishTraining() {
  const raw = $('en-source-text').value.trim();
  if (!raw) { $('en-source-text').focus(); return; }
  enSentences = parseEnglishSentences(raw);
  if (!enSentences.length) { alert('Please enter some English text to practice.'); return; }
  enSeqIdx  = 0;
  enUsedIdx = [];
  $('en-input-sec').classList.add('hidden');
  $('en-training-sec').classList.remove('hidden');
  loadEnRound();
}

function pickEnSentences() {
  const n    = Math.min(2, enSentences.length);
  const mode = document.querySelector('input[name="en-order"]:checked').value;
  if (mode === 'sequential') {
    const picks = [];
    for (let i = 0; i < n; i++) picks.push(enSentences[enSeqIdx++ % enSentences.length]);
    return picks;
  }
  if (enUsedIdx.length + n > enSentences.length) enUsedIdx = [];
  const pool   = enSentences.map((_,i) => i).filter(i => !enUsedIdx.includes(i));
  const chosen = pool.sort(() => Math.random() - .5).slice(0, n);
  enUsedIdx.push(...chosen);
  return chosen.map(i => enSentences[i]);
}

function loadEnRound() {
  stopEnTimer();
  enStartTime = null;
  enPrevLen   = 0;

  const picks   = pickEnSentences();
  enTargetChars = [...picks.join(' ')];

  enTypeInputEl.value    = '';
  enTypeInputEl.disabled = false;
  enRoundActive          = true;

  $('en-score-card').classList.add('hidden');
  $('en-rt-stats').classList.add('hidden');
  $('en-rts-time').textContent  = '0:00';
  $('en-rts-cpm').textContent   = '0';
  $('en-rts-acc').textContent   = '--%';
  $('en-rts-errs').textContent  = '0';
  $('en-acc-badge').textContent = '准确率：--';

  renderEnglishTarget([]);
  enTypeInputEl.focus();
}

// ── Render target (spaces shown as · ) ──
function renderEnglishTarget(ic) {
  $('en-target-display').innerHTML = enTargetChars.map((ch, i) => {
    const cls = i < ic.length
      ? (ic[i] === ch ? 'correct' : 'wrong')
      : (i === ic.length ? 'current' : 'pending');
    if (ch === ' ') return `<span class="char en-sp ${cls}">·</span>`;
    const s = ch==='&'?'&amp;':ch==='<'?'&lt;':ch==='>'?'&gt;':ch;
    return `<span class="char ${cls}">${s}</span>`;
  }).join('');
}

// ── Accuracy helpers ──
function calcEnAcc(ic) {
  if (!enTargetChars.length) return 0;
  let ok = 0;
  enTargetChars.forEach((ch, i) => { if (ic[i] === ch) ok++; });
  return Math.round(ok / enTargetChars.length * 100);
}
function countEnErrors(ic) {
  let errs = 0;
  enTargetChars.forEach((ch, i) => { if (i < ic.length && ic[i] !== ch) errs++; });
  return errs;
}

// ── Timer ──
function startEnTimer() {
  if (enStartTime) return;
  enStartTime = Date.now();
  $('en-rt-stats').classList.remove('hidden');
  enTimerID = setInterval(updateEnStats, 1000);
}
function stopEnTimer() {
  clearInterval(enTimerID);
  enTimerID = null;
}
function updateEnStats() {
  if (!enStartTime) return;
  const elapsed = (Date.now() - enStartTime) / 1000;
  const ic      = [...(enTypeInputEl.value || '')];
  const mins    = elapsed / 60;
  $('en-rts-time').textContent  = formatTime(elapsed);
  $('en-rts-cpm').textContent   = mins > 0.01 ? Math.round(ic.length / mins) : 0;
  $('en-rts-acc').textContent   = calcEnAcc(ic) + '%';
  $('en-rts-errs').textContent  = countEnErrors(ic);
}

// ── Input handler ──
function onEnInput() {
  if (!enRoundActive) return;
  const ic = [...enTypeInputEl.value];

  if (ic.length > 0 && !enStartTime) startEnTimer();

  if (ic.length > enPrevLen && ic.length <= enTargetChars.length) {
    const idx = ic.length - 1;
    ic[idx] === enTargetChars[idx] ? sfxTypeOk() : sfxTypeErr();
  }
  enPrevLen = ic.length;

  renderEnglishTarget(ic);
  if (enStartTime) updateEnStats();
  $('en-acc-badge').textContent = `准确率：${calcEnAcc(ic)}%`;

  if (ic.length >= enTargetChars.length && enTargetChars.every((ch, i) => ic[i] === ch)) {
    completeEnRound();
  }
}

// ── Complete round ──
function completeEnRound() {
  enRoundActive = false;
  enTypeInputEl.disabled = true;
  stopEnTimer();

  const elapsed  = enStartTime ? (Date.now() - enStartTime) / 1000 : 0;
  const ic       = [...enTypeInputEl.value];
  const acc      = calcEnAcc(ic);
  const errCount = countEnErrors(ic);
  const mins     = elapsed / 60;
  const cpm      = mins > 0.01 ? Math.round(enTargetChars.length / mins) : 0;

  setStars(getStars() + 1);
  setDones(getDones() + 1);
  sfxComplete();
  const card  = drawCard();
  const count = addToColl(card);
  refreshStats();

  const emoji = acc===100?'🏆':acc>=80?'🎉':acc>=60?'👍':'💪';
  $('en-sc-emoji').textContent = emoji;
  $('en-sc-title').textContent = '完成！正在抽卡……';
  $('en-sc-sub').textContent   = `⭐ ${getStars()} 颗星`;
  $('en-sc-acc').textContent   = acc + '%';
  $('en-sc-errs').textContent  = errCount + ' 个';
  $('en-sc-cpm').textContent   = cpm > 0 ? cpm : '--';
  $('en-sc-time').textContent  = elapsed > 1 ? formatTime(elapsed) : '--';
  $('en-score-card').classList.remove('hidden');
  setTimeout(() => showDrawModal(card, count), 800);
}

/* ══════════════════════════════════════════════════  KEYBOARD PRACTICE  ══ */

const KB_ROWS_VISUAL = [
  ['q','w','e','r','t','y','u','i','o','p'],
  ['a','s','d','f','g','h','j','k','l',';',"'"],
  ['z','x','c','v','b','n','m',',','.','-'],
  [' '],
];

const KB_GROUPS = {
  letters: [...'abcdefghijklmnopqrstuvwxyz'],
  home:    [...'asdfghjkl'],
  top:     [...'qwertyuiop'],
  bottom:  [...'zxcvbnm'],
  vowels:  [...'aeiou'],
  mixed:   [...'abcdefghijklmnopqrstuvwxyz', ' ', '.', ',', ';', "'", '-'],
};

const KB_GROUP_NAMES = {
  letters:'全部字母', home:'主键行', top:'上键行',
  bottom:'下键行',   vowels:'元音', mixed:'混合练习',
};

// ── State ──
let kbGroup     = 'letters';
let kbLength    = 30;
let kbSeq       = [];
let kbIdx       = 0;
let kbErrors    = 0;
let kbStartTime = null;
let kbActive    = false;
let kbLiveTimer = null;

// ── Group buttons ──
document.querySelectorAll('.kb-group-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.kb-group-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    kbGroup = btn.dataset.group;
  });
});

// Stop keyboard round when switching away from keyboard tab
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (kbActive && btn.dataset.tab !== 'keyboard') stopKbRound();
  });
});

$('kb-start-btn').addEventListener('click', startKbRound);
$('kb-stop-btn').addEventListener('click',  stopKbRound);
$('kb-again-btn').addEventListener('click', () => {
  $('kb-result-sec').classList.add('hidden');
  $('kb-setup-sec').classList.remove('hidden');
});
$('kb-back-btn').addEventListener('click', () => {
  $('kb-result-sec').classList.add('hidden');
  $('kb-setup-sec').classList.remove('hidden');
});

// ── Round management ──

function startKbRound() {
  const lenEl = document.querySelector('input[name="kb-len"]:checked');
  kbLength    = lenEl ? parseInt(lenEl.value) : 30;

  const group = KB_GROUPS[kbGroup];
  kbSeq       = Array.from({ length: kbLength }, () => group[Math.floor(Math.random() * group.length)]);
  kbIdx       = 0;
  kbErrors    = 0;
  kbStartTime = null;
  kbActive    = true;

  $('kb-setup-sec').classList.add('hidden');
  $('kb-result-sec').classList.add('hidden');
  $('kb-practice-sec').classList.remove('hidden');

  renderKbKeyboard();
  renderKbSeqStrip();
  updateKbProgress();
  updateKbLiveStats();
  startKbLiveTimer();
  document.addEventListener('keydown', _kbKeyHandler);
}

function stopKbRound() {
  kbActive = false;
  document.removeEventListener('keydown', _kbKeyHandler);
  stopKbLiveTimer();
  $('kb-practice-sec').classList.add('hidden');
  $('kb-setup-sec').classList.remove('hidden');
}

function endKbRound() {
  document.removeEventListener('keydown', _kbKeyHandler);
  stopKbLiveTimer();

  const elapsed = kbStartTime ? (Date.now() - kbStartTime) / 1000 : 0;
  const total   = kbSeq.length + kbErrors;
  const acc     = Math.round(kbSeq.length / total * 100);
  const mins    = elapsed / 60;
  const kpm     = mins > 0.01 ? Math.round(kbSeq.length / mins) : 0;

  sfxComplete();

  setStars(getStars() + 1);
  setDones(getDones() + 1);
  const card  = drawCard();
  const count = addToColl(card);
  refreshStats();

  const emoji = acc === 100 ? '🏆' : acc >= 80 ? '🎉' : acc >= 60 ? '👍' : '💪';
  $('kb-sc-emoji').textContent = emoji;
  $('kb-sc-title').textContent = '键盘练习完成！正在抽卡……';
  $('kb-sc-sub').textContent   = `${KB_GROUP_NAMES[kbGroup]} · ⭐ ${getStars()} 颗星`;
  $('kb-sc-acc').textContent   = acc + '%';
  $('kb-sc-errs').textContent  = kbErrors + ' 次';
  $('kb-sc-kpm').textContent   = kpm > 0 ? kpm : '--';
  $('kb-sc-time').textContent  = elapsed > 1 ? formatTime(elapsed) : '--';

  $('kb-practice-sec').classList.add('hidden');
  $('kb-result-sec').classList.remove('hidden');
  setTimeout(() => showDrawModal(card, count), 800);
}

// ── Key handler ──

function _kbKeyHandler(e) {
  if (!kbActive) return;
  if (e.ctrlKey || e.altKey || e.metaKey) return;

  let key = e.key;
  if (key === ' ') {
    e.preventDefault();
  } else if (key.length === 1) {
    key = key.toLowerCase();
    e.preventDefault();
  } else {
    return;
  }

  if (kbStartTime === null) kbStartTime = Date.now();

  const target = kbSeq[kbIdx];
  if (key === target) {
    sfxTypeOk();
    flashKbKey(target, true);
    kbIdx++;
    renderKbSeqStrip();
    updateKbProgress();
    updateKbLiveStats();
    if (kbIdx >= kbSeq.length) {
      kbActive = false;
      updateKbTargetHighlight();
      setTimeout(endKbRound, 300);
    } else {
      updateKbTargetHighlight();
    }
  } else {
    sfxTypeErr();
    kbErrors++;
    flashKbKey(target, false);
    updateKbLiveStats();
    const cur = document.querySelector('.kb-sc-current');
    if (cur) { cur.classList.add('kb-shake'); setTimeout(() => cur.classList.remove('kb-shake'), 300); }
  }
}

// ── Render QWERTY keyboard ──

function renderKbKeyboard() {
  const kb = $('kb-keyboard');
  if (!kb) return;
  kb.innerHTML = '';
  KB_ROWS_VISUAL.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'kb-row';
    row.forEach(k => {
      const isSpace = k === ' ';
      const div     = document.createElement('div');
      div.className = 'kb-key' + (isSpace ? ' kb-key-space' : '');
      div.dataset.key = isSpace ? 'space' : k;
      div.textContent = isSpace ? '空格' : k;
      rowDiv.appendChild(div);
    });
    kb.appendChild(rowDiv);
  });
  updateKbTargetHighlight();
}

function updateKbTargetHighlight() {
  const target = kbIdx < kbSeq.length ? kbSeq[kbIdx] : null;
  const tAttr  = target === ' ' ? 'space' : target;
  document.querySelectorAll('#kb-keyboard .kb-key').forEach(el => {
    el.classList.toggle('kb-key-target', el.dataset.key === tAttr);
  });
}

// ── Render sequence strip ──

function renderKbSeqStrip() {
  const strip = $('kb-seq-strip');
  if (!strip) return;
  const BEFORE = 3, AFTER = 9;
  const start  = Math.max(0, kbIdx - BEFORE);
  const end    = Math.min(kbSeq.length, kbIdx + AFTER + 1);
  strip.innerHTML = '';
  for (let i = start; i < end; i++) {
    const ch    = kbSeq[i];
    const isSpace = ch === ' ';
    const span  = document.createElement('span');
    let cls;
    if (i < kbIdx)       cls = 'kb-sc kb-sc-past';
    else if (i === kbIdx) cls = 'kb-sc kb-sc-current';
    else                  cls = 'kb-sc kb-sc-next';
    span.className  = cls;
    if (isSpace) {
      const lbl = document.createElement('span');
      lbl.className   = 'kb-sc-space-lbl';
      lbl.textContent = '␣';
      span.appendChild(lbl);
    } else {
      span.textContent = ch;
    }
    strip.appendChild(span);
  }
}

// ── Flash key feedback ──

function flashKbKey(keyVal, ok) {
  const kAttr = keyVal === ' ' ? 'space' : keyVal;
  let el = null;
  document.querySelectorAll('#kb-keyboard .kb-key').forEach(k => {
    if (k.dataset.key === kAttr) el = k;
  });
  if (!el) return;
  const cls = ok ? 'kb-key-ok' : 'kb-key-err';
  el.classList.add(cls);
  setTimeout(() => el.classList.remove(cls), 180);
}

// ── Progress & live stats ──

function updateKbProgress() {
  const fill = $('kb-prog-fill');
  const txt  = $('kb-prog-text');
  if (fill) fill.style.width = (kbLength > 0 ? kbIdx / kbLength * 100 : 0) + '%';
  if (txt)  txt.textContent  = `${kbIdx} / ${kbLength}`;
}

function updateKbLiveStats() {
  const accEl = $('kb-live-acc');
  const kpmEl = $('kb-live-kpm');
  if (!accEl || !kpmEl) return;
  const total = kbIdx + kbErrors;
  const acc   = total > 0 ? Math.round(kbIdx / total * 100) : 100;
  accEl.textContent = `🎯 ${acc}%`;
  if (kbStartTime) {
    const mins = (Date.now() - kbStartTime) / 60000;
    kpmEl.textContent = `⚡ ${mins > 0.001 ? Math.round(kbIdx / mins) : 0} 键/分`;
  }
}

function startKbLiveTimer() {
  stopKbLiveTimer();
  kbLiveTimer = setInterval(() => { if (kbStartTime && kbActive) updateKbLiveStats(); }, 1000);
}

function stopKbLiveTimer() {
  clearInterval(kbLiveTimer);
  kbLiveTimer = null;
}
