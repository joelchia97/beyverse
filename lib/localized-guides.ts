export type LocalizedGuide = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  published_at: string;
};

export type GuideLocale = "zh" | "ms";

export const localizedGuides: Record<GuideLocale, LocalizedGuide[]> = {
  zh: [
    {
      slug: "launch-control-for-beyblade-x",
      title: "Beyblade X 发射控制指南",
      category: "新手攻略",
      excerpt: "了解角度、力量和轨道时机如何影响开局路线。",
      content:
        "发射控制会决定攻击组合是真的制造压力，还是只是在浪费持久力。Beyblade X 的强力发射不只是用力拉发射器，而是选择符合组合胜利方式的路线。\n\n攻击组合可以先测试三种发射：平发射、轻微倾斜发射和花形路线。平发射通常速度直接，但如果陀螺一直绕圈没有碰到对手，就会浪费持久力。轻微倾斜发射有机会更早进入 Xtreme 轨道。花形路线则会创造多次接近角度，适合需要多次机会打出击飞的组合。\n\n持久和防御组合通常目标相反。你希望陀螺安全稳定下来，避免不必要的撞墙，并让对手先消耗能量。可以尝试更平稳、倾斜更少的发射方式，然后比较你的组合是否更稳定地撑过前十秒。\n\n建议保留测试笔记。记录组合、对手、发射角度、发射力量和结果。十场之后，规律会变得更明显。你可能会发现，组合输不是因为零件弱，而是发射路线让它失去了最好的对局机会。",
      published_at: "2026-01-10"
    },
    {
      slug: "attack-defense-stamina-balance-types",
      title: "攻击、防御、持久和平衡类型说明",
      category: "新手攻略",
      excerpt: "在配组合前，先理解 Beyblade 的四种主要定位。",
      content:
        "每一种 Beyblade 类型，都是理解胜利方式的快捷入口。攻击型想快速结束比赛，防御型想承受强力碰撞，持久型想旋转得更久，平衡型则尝试结合两种或更多思路。\n\n攻击型需要移动和接触。它们通常使用更有侵略性的 Bit 和较低的配置，尽快接近对手。弱点是如果攻击落空，就会快速消耗持久力。强的攻击组合不只是快，而是要在正确时间碰到对手。\n\n防御型是为了抗住撞击。它们通常偏好稳定形状、安全 Bit 和不乱跑的配置。它们的问题是压力不足。如果一个防御组合只能活下来，却不能反打或拖到胜利，还是可能会输。\n\n持久型重视效率。它们会避免糟糕接触、保存旋转，并在后期赢下比赛。最大危险是还没进入后期就被击飞。好的持久组合必须有足够稳定性撑过前期攻击。\n\n平衡型最灵活，但也最容易被误解。真正好的平衡组合仍然需要一个主要计划。备用计划让它灵活，主要计划才让它有威胁。",
      published_at: "2026-05-30"
    },
    {
      slug: "beginner-buying-guide-for-beyblade-x",
      title: "Beyblade X 新手购买指南",
      category: "购买指南",
      excerpt: "新玩家如何选择第一批 Beyblade，而不是随便买一堆零件。",
      content:
        "好的新手收藏应该覆盖不同定位，而不只是买喜欢的外观。开始买很多产品之前，最好先拥有至少一个攻击选择、一个持久选择、一个防御或平衡选择，以及几个实用 Ratchet 和 Bit。\n\n攻击产品可以教你移动和击飞时机。持久产品可以教你保存旋转和安全发射。防御产品可以教你承受撞击和控制风险。平衡产品可以教你调整组合和适应对局。四种定位都有，练习会更有意义。\n\n不要只根据 tier list 购买。一个很强的竞技零件，如果你不懂得发射或调整，也不一定有帮助。通常买少量实用零件并深入测试，比买很多产品却不了解它们的行为更好。\n\n第一阶段升级可以专注在多样性：一个低 Ratchet、一个稳定 Ratchet、一个攻击 Bit、一个持久 Bit 和一个平衡 Bit。这样你就有足够零件理解为什么不同组合会有不同表现。\n\n最好的购买，是能让你玩更多、测试更多，并更了解自己风格的购买。BeyVerse 可以帮助你选择，但最终还是要由你的本地对战经验来决定。",
      published_at: "2026-06-11"
    },
    {
      slug: "dran-sword-combo-guide",
      title: "Dran Sword 组合指南",
      category: "陀螺攻略",
      excerpt: "学习如何用 Dran Sword 打出稳定攻击压力和新手友好的击飞测试。",
      content:
        "Dran Sword 是很适合学习攻击时机的 Beyblade X Blade。它奖励能够快速接触对手的玩家，但如果发射路线只是在场地外圈乱跑，也会很快浪费持久力。\n\n使用 Dran Sword 的第一件事是控制。新手常常想用最大力量发射，但太多力量可能导致大范围移动却没有有效接触。先尝试轻微倾斜发射，观察 Dran Sword 是在对手稳定前还是稳定后进入 Xtreme 轨道。\n\n新手可以测试 Dran Sword 3-60 Flat、Dran Sword 5-60 Rush 和 Dran Sword 9-60 Point。Flat 教你原始速度，Rush 提供更好的控制但保留压力，Point 则让 Dran Sword 变成攻击和平衡之间的实验组合。\n\nDran Sword 最擅长在持久组合稳定前施加压力。它可能会被能吸收第一击的防御组合克制，也可能因为发射路线过度而自爆出界。如果 Dran Sword 经常输，先调整发射角度，再考虑换零件。\n\n一个简单测试问题是：Dran Sword 能不能在前五秒内碰到对手？如果答案是否定的，它就没有发挥主要优势。调整 Bit、Ratchet 或发射方式，直到早期接触变得稳定。",
      published_at: "2026-06-12"
    },
    {
      slug: "phoenix-wing-combo-guide",
      title: "Phoenix Wing 组合指南",
      category: "陀螺攻略",
      excerpt: "围绕重击、可控移动和稳定攻击压力来构建 Phoenix Wing。",
      content:
        "Phoenix Wing 是强力攻击选择，因为它把有威胁的接触和不错的重量结合在一起。它可以制造强力击飞，但仍然需要控制，而不是只靠蛮力。\n\n常见错误是认为 Phoenix Wing 一定要配最激进的 Bit。Gear Flat 可以制造爆发移动，但也可能快速消耗持久力或错过接触窗口。学习这个 Blade 时，可以把 Gear Flat 与 Rush、Point 或 Taper 比较，看看控制力提升多少。\n\n推荐起点包括 Phoenix Wing 9-60 Gear Flat 做最大攻击测试，Phoenix Wing 5-60 Rush 做可控压力，Phoenix Wing 9-60 Point 做攻击平衡用途。9-60 配置通常更安全，低位和更激进配置则可以增加击飞潜力。\n\nPhoenix Wing 擅长打乱对手节奏。面对持久组合，目标是早期干扰。面对防御组合，目标是避免把持久力浪费在无效接触上。面对其他攻击组合，发射控制往往决定整场比赛。\n\n请认真记录自爆出界。如果 Phoenix Wing 赢得很猛，但也常常自己出界，它可能很强但不稳定。有时候更安全的 Bit 会让实战表现更好，即使攻击感觉没那么夸张。",
      published_at: "2026-06-13"
    },
    {
      slug: "wizard-rod-combo-guide",
      title: "Wizard Rod 组合指南",
      category: "陀螺攻略",
      excerpt: "把 Wizard Rod 当作持久基准，用来测试安全发射、后期旋转和对局稳定性。",
      content:
        "Wizard Rod 最适合被理解为持久基准。玩家测试新的攻击或平衡想法时，Wizard Rod 类型持久组合经常是必须证明能打赢的对象。\n\nWizard Rod 的主要目标是撑过开局，并带着足够旋转进入后期。因此发射要稳定，Ratchet 不应该让组合过度暴露，Bit 也要支持平稳移动。\n\n新手友好的配置包括 Wizard Rod 9-60 Ball、Wizard Rod 5-70 Orb 和 Wizard Rod 9-80 Disk Ball。Ball 让思路简单，Orb 增加中心控制，Disk Ball 或 Free Ball 类型则适合深入研究后期持久表现。\n\nWizard Rod 对被动或不稳定组合表现不错，但必须尊重强攻击。如果它太常被击飞，不要立刻追求更多持久。先问这个配置是否足够稳定，能不能承受第一击。\n\n测试 Wizard Rod 最好的方法是记录输法。它是被击飞、被打歪，还是后期旋转输掉？不同输法代表不同修正方向：更多稳定性、更安全高度、更好发射控制，或不同 Bit。",
      published_at: "2026-06-14"
    },
    {
      slug: "shark-edge-combo-guide",
      title: "Shark Edge 组合指南",
      category: "陀螺攻略",
      excerpt: "给 Shark Edge 玩家的一份高风险攻击指南：打出强力撞击，同时不要失控。",
      content:
        "Shark Edge 是高风险攻击 Blade。它能打出危险的 smash attack，但这种有威胁的接触也可能带来高反作用力和错失机会。\n\nShark Edge 的第一课是：力量需要目标。如果发射让 Shark Edge 在碰到对手前先撞墙，它就浪费了最好的机会。先练习可控攻击，再进入全力发射测试。\n\n可测试组合包括 Shark Edge 3-60 Low Flat、Shark Edge 5-60 Rush 和 Shark Edge 1-60 Flat。Low Flat 和 Flat 提供强早期压力，Rush 让移动更容易管理。如果自爆太多，也可以测试 Point 作为较安全的攻击平衡选择。\n\nShark Edge 最危险的对手是需要时间稳定的组合。它可以惩罚发射太保守的持久组合，或早期防御不足的平衡组合。它可能会被能吸收撞击或撑过第一波攻击的配置限制。\n\n测试 Shark Edge 时，把干净命中和胜利分开记录。有时它虽然打出强力命中却仍然输，因为反作用力太高。如果发生这种情况，调整 Bit 或 Ratchet，让攻击路线仍然危险但不要太鲁莽。",
      published_at: "2026-06-15"
    },
    {
      slug: "dran-buster-combo-guide",
      title: "Dran Buster 组合指南",
      category: "陀螺攻略",
      excerpt: "如何调整 Dran Buster，打出紧凑攻击、快速收场和实用测试表现。",
      content:
        "Dran Buster 是奖励直接进攻的攻击 Blade。它应该围绕快速结束、紧凑配置和能在对手稳定前制造有效接触的发射路线来测试。\n\n因为 Dran Buster 容错率不高，新手不要一次更换太多零件。想做纯攻击测试，可以从 Dran Buster 1-60 Low Flat 开始，然后比较 Dran Buster 3-60 Rush 和 Dran Buster 5-60 Point。每个配置都会教你不同攻击风格。\n\nLow Flat 提供强速度和低角度压力，但也增加自爆风险。Rush 可以让 Dran Buster 更容易控制，同时保留攻击身份。Point 则提供备用计划，如果开局攻击没有立刻结束比赛，还能继续对抗。\n\nDran Buster 希望对手快速做出反应。面对持久，它要在后期前施压。面对防御，它需要干净接触，而不是重复打出弱碰撞。面对其他攻击组合，通常是谁发射更好谁赢。\n\n一个好的 Dran Buster 测试，是用同一配置打十场并记录第一次接触时间。如果第一次接触太晚，这个组合没有发挥直接攻击身份。如果接触很早但结果不稳定，就应该调整控制，而不是继续追求更快速度。",
      published_at: "2026-06-16"
    }
  ],
  ms: [
    {
      slug: "launch-control-for-beyblade-x",
      title: "Panduan Launch Control untuk Beyblade X",
      category: "Strategi Pemula",
      excerpt: "Fahami bagaimana sudut, kuasa dan timing rail mengubah corak permulaan.",
      content:
        "Launch control menentukan sama ada combo attack benar-benar memberi tekanan atau hanya membazir stamina. Launch Beyblade X yang kuat bukan sekadar tarik launcher dengan kuat; ia tentang memilih corak yang sesuai dengan cara combo itu menang.\n\nUntuk combo attack, mula dengan tiga jenis launch: launch rata, launch sedikit condong dan corak flower yang terkawal. Launch rata biasanya memberi kelajuan terus, tetapi boleh membazir stamina jika Beyblade berpusing tanpa contact. Launch sedikit condong boleh membantu Beyblade menyentuh rail dan masuk ke Xtreme line lebih awal. Corak flower pula memberi beberapa sudut serangan, berguna apabila anda perlukan beberapa peluang untuk knockout.\n\nUntuk combo stamina dan defense, matlamat biasanya berbeza. Anda mahu Beyblade duduk dengan selamat, elak hentaman dinding yang tidak perlu dan paksa lawan membazir tenaga dahulu. Cuba launch yang lebih tenang dengan kurang tilt, kemudian bandingkan sama ada combo anda lebih konsisten bertahan pada sepuluh saat pertama.\n\nSimpan nota ujian. Tulis combo, lawan, sudut launch, kekuatan launch dan keputusan. Selepas sepuluh battle, corak akan jadi lebih jelas. Kadang-kadang combo kalah bukan kerana parts lemah, tetapi kerana corak launch memberi matchup terbaik kepada lawan.",
      published_at: "2026-01-10"
    },
    {
      slug: "attack-defense-stamina-balance-types",
      title: "Jenis Attack, Defense, Stamina dan Balance",
      category: "Strategi Pemula",
      excerpt: "Fahami empat peranan utama Beyblade sebelum membina combo.",
      content:
        "Setiap jenis Beyblade ialah cara cepat untuk faham win condition semula jadi. Attack mahu tamatkan battle dengan cepat. Defense mahu bertahan daripada contact kuat. Stamina mahu berpusing lebih lama. Balance cuba gabungkan dua atau lebih idea tersebut.\n\nJenis attack perlukan movement dan contact. Ia biasanya menggunakan Bit agresif dan setup rendah untuk sampai kepada lawan dengan cepat. Kelemahannya ialah serangan yang tersasar akan membazir stamina. Combo attack yang kuat bukan hanya laju; ia mesti mengenai lawan pada masa yang tepat.\n\nJenis defense dibina untuk menerima hentaman. Ia biasanya suka bentuk stabil, Bit yang lebih selamat dan setup yang tidak bergerak terlalu liar. Cabarannya ialah tekanan. Jika combo defense hanya bertahan tetapi tidak boleh outspin atau counter, ia masih boleh kalah.\n\nJenis stamina fokus pada kecekapan. Ia cuba elak contact buruk, simpan spin dan menang lewat. Bahaya paling besar ialah knockout sebelum stamina menjadi penting. Combo stamina yang baik perlukan kestabilan untuk bertahan daripada serangan awal.\n\nJenis balance paling fleksibel tetapi mudah disalah faham. Combo balance yang bagus masih perlu ada pelan utama. Pelan kedua menjadikannya fleksibel; pelan utama menjadikannya berbahaya.",
      published_at: "2026-05-30"
    },
    {
      slug: "beginner-buying-guide-for-beyblade-x",
      title: "Panduan Membeli Beyblade X untuk Pemula",
      category: "Panduan Membeli",
      excerpt: "Cara pemain baru memilih pembelian pertama tanpa membeli parts secara rawak.",
      content:
        "Koleksi pemula yang baik patut meliputi peranan, bukan hanya reka bentuk kegemaran. Sebelum membeli terlalu banyak keluaran, cuba miliki sekurang-kurangnya satu pilihan attack, satu pilihan stamina, satu pilihan defense atau balance, dan beberapa Ratchet serta Bit yang berguna.\n\nKeluaran attack mengajar movement dan timing knockout. Keluaran stamina mengajar spin preservation dan launch yang selamat. Keluaran defense mengajar cara bertahan dan kawal hentaman. Keluaran balance mengajar tuning dan penyesuaian. Apabila ada keempat-empat peranan, latihan menjadi lebih berguna.\n\nElakkan membeli hanya berdasarkan tier list. Part kompetitif yang kuat mungkin tidak membantu jika anda belum faham cara launch atau tuning. Lebih baik beli set kecil parts yang berguna dan uji dengan mendalam daripada membeli banyak keluaran tetapi tidak memahami tingkah lakunya.\n\nUntuk upgrade pertama, fokus pada variasi: satu Ratchet rendah, satu Ratchet stabil, satu Bit attack, satu Bit stamina dan satu Bit balance. Itu cukup untuk belajar kenapa combo berlainan bergerak secara berbeza.\n\nPembelian terbaik ialah pembelian yang membuat anda bermain lebih banyak, menguji lebih banyak dan memahami gaya sendiri. BeyVerse boleh memberi panduan, tetapi battle tempatan anda patut membentuk keputusan akhir.",
      published_at: "2026-06-11"
    },
    {
      slug: "dran-sword-combo-guide",
      title: "Panduan Combo Dran Sword",
      category: "Panduan Beyblade",
      excerpt: "Cara menggunakan Dran Sword untuk tekanan attack yang terkawal dan ujian knockout mesra pemula.",
      content:
        "Dran Sword ialah salah satu Blade attack Beyblade X yang paling jelas untuk belajar timing contact. Ia memberi ganjaran kepada pemain yang boleh sampai kepada lawan dengan cepat, tetapi ia juga menghukum launch yang hanya membazir movement di luar stadium.\n\nPerkara pertama untuk belajar dengan Dran Sword ialah kawalan. Pemain baru mungkin mahu launch sekuat mungkin, tetapi terlalu banyak kuasa boleh menghasilkan movement luas tanpa contact bermakna. Mula dengan launch sedikit condong dan lihat sama ada Dran Sword masuk ke Xtreme line sebelum atau selepas lawan stabil.\n\nUntuk ujian pemula, cuba Dran Sword 3-60 Flat, Dran Sword 5-60 Rush dan Dran Sword 9-60 Point. Flat mengajar kelajuan mentah. Rush memberi sedikit kawalan sambil mengekalkan tekanan. Point menjadikan Dran Sword eksperimen attack-balance yang masih boleh mengancam knockout.\n\nDran Sword paling kuat apabila ia menekan combo stamina sebelum combo itu stabil. Ia boleh susah melawan combo defense yang menyerap hit pertama atau apabila corak launch menyebabkan self-KO. Jika Dran Sword kerap kalah, uji sudut launch dahulu sebelum menukar parts.\n\nSoalan ujian yang berguna: adakah Dran Sword membuat contact dalam lima saat pertama? Jika tidak, combo itu belum menggunakan kelebihan utamanya. Laraskan Bit, Ratchet atau launch sehingga contact awal lebih konsisten.",
      published_at: "2026-06-12"
    },
    {
      slug: "phoenix-wing-combo-guide",
      title: "Panduan Combo Phoenix Wing",
      category: "Panduan Beyblade",
      excerpt: "Bina Phoenix Wing sekitar impact berat, movement terkawal dan tekanan attack yang boleh dipercayai.",
      content:
        "Phoenix Wing ialah pilihan attack yang kuat kerana ia menggabungkan contact yang berbahaya dengan berat yang bermakna. Ia boleh menghasilkan knockout yang mengancam, tetapi masih perlu dikawal dan bukan hanya bergantung pada kuasa.\n\nKesilapan biasa ialah menganggap Phoenix Wing mesti sentiasa menggunakan Bit paling agresif. Gear Flat boleh menghasilkan movement yang meletup, tetapi ia juga boleh membakar stamina atau terlepas peluang contact. Jika anda sedang belajar Blade ini, bandingkan Gear Flat dengan Rush, Point atau Taper untuk melihat berapa banyak kawalan yang anda dapat.\n\nIdea permulaan yang baik termasuk Phoenix Wing 9-60 Gear Flat untuk ujian attack maksimum, Phoenix Wing 5-60 Rush untuk tekanan terkawal, dan Phoenix Wing 9-60 Point untuk kegunaan balance-attack. Setup 9-60 boleh rasa lebih selamat, manakala setup rendah dan agresif boleh meningkatkan potensi knockout.\n\nPhoenix Wing bagus apabila ia memaksa lawan keluar daripada corak pilihan mereka. Melawan stamina, matlamatnya ialah mengganggu awal. Melawan defense, matlamatnya ialah tidak membazir stamina pada contact yang selamat. Melawan attack lain, launch control menjadi penentu battle.\n\nRekod self-KO dengan teliti. Jika Phoenix Wing menang besar tetapi juga kerap keluar stadium sendiri, combo itu mungkin kuat tetapi tidak reliable. Bit yang sedikit lebih selamat kadang-kadang memberi prestasi match sebenar yang lebih baik walaupun rasa attack lebih rendah.",
      published_at: "2026-06-13"
    },
    {
      slug: "wizard-rod-combo-guide",
      title: "Panduan Combo Wizard Rod",
      category: "Panduan Beyblade",
      excerpt: "Gunakan Wizard Rod sebagai benchmark stamina untuk launch selamat, spin lewat dan ujian matchup.",
      content:
        "Wizard Rod paling sesuai difahami sebagai benchmark stamina. Apabila pemain menguji idea attack atau balance baru, build stamina gaya Wizard Rod selalunya menjadi lawan yang perlu dibuktikan boleh ditewaskan.\n\nMatlamat utama Wizard Rod ialah bertahan pada pembukaan dan sampai ke late game dengan spin yang cukup. Ini bermaksud launch perlu stabil, Ratchet tidak patut mendedahkan combo secara berlebihan, dan Bit perlu menyokong movement yang tenang.\n\nSetup mesra pemula termasuk Wizard Rod 9-60 Ball, Wizard Rod 5-70 Orb dan Wizard Rod 9-80 Disk Ball. Ball menjadikan idea mudah. Orb menambah kawalan tengah. Disk Ball atau idea Free Ball boleh diuji apabila anda mahu mengkaji tingkah laku stamina late game dengan lebih mendalam.\n\nWizard Rod boleh bagus melawan combo pasif atau tidak konsisten, tetapi ia mesti menghormati attack yang kuat. Jika ia terlalu kerap kena knockout, jangan terus mengejar stamina tambahan. Tanya dahulu sama ada setup itu cukup stabil untuk bertahan daripada hit pertama.\n\nCara terbaik menguji Wizard Rod ialah melalui nota matchup. Rekod sama ada ia kalah melalui knockout, destabilization atau spin finish. Setiap jenis kekalahan menunjukkan pembaikan berbeza: lebih stabil, height lebih selamat, launch control lebih baik atau Bit lain.",
      published_at: "2026-06-14"
    },
    {
      slug: "shark-edge-combo-guide",
      title: "Panduan Combo Shark Edge",
      category: "Panduan Beyblade",
      excerpt: "Panduan attack berisiko tinggi untuk pemain Shark Edge yang mahu hit kuat tanpa hilang kawalan.",
      content:
        "Shark Edge ialah Blade attack berisiko tinggi. Ia boleh menghasilkan smash attack yang berbahaya, tetapi contact yang sama juga boleh menyebabkan recoil dan peluang yang terlepas.\n\nPelajaran pertama Shark Edge ialah kuasa perlukan sasaran. Jika launch menghantar Shark Edge ke dinding stadium sebelum menyentuh lawan, combo itu membazir peluang terbaiknya. Mula dengan agresif yang terkawal sebelum masuk ke ujian launch penuh kuasa.\n\nCombo ujian yang berguna termasuk Shark Edge 3-60 Low Flat, Shark Edge 5-60 Rush dan Shark Edge 1-60 Flat. Low Flat dan Flat memberi tekanan awal yang kuat, manakala Rush menjadikan movement lebih mudah dikawal. Jika combo terlalu banyak self-KO, Point boleh diuji sebagai pilihan attack-balance yang lebih selamat.\n\nShark Edge paling berbahaya terhadap combo yang perlukan masa untuk stabil. Ia boleh menghukum stamina yang launch terlalu tenang atau balance yang kurang pertahanan awal. Ia boleh susah melawan setup yang menyerap impact atau bertahan daripada exchange pertama.\n\nSemasa menguji Shark Edge, kira clean hit secara berasingan daripada kemenangan. Kadang-kadang ia kalah walaupun mendaratkan hit kuat kerana recoil terlalu tinggi. Jika itu berlaku, laraskan Bit atau Ratchet supaya laluan attack masih berbahaya tetapi kurang reckless.",
      published_at: "2026-06-15"
    },
    {
      slug: "dran-buster-combo-guide",
      title: "Panduan Combo Dran Buster",
      category: "Panduan Beyblade",
      excerpt: "Cara tune Dran Buster untuk attack compact, penamat pantas dan ujian praktikal.",
      content:
        "Dran Buster ialah Blade attack yang memberi ganjaran kepada permainan terus. Ia patut diuji sekitar penamat pantas, setup compact dan corak launch yang menghasilkan contact bermakna sebelum lawan stabil.\n\nOleh sebab Dran Buster boleh terasa kurang memaafkan, pemain baru tidak patut menukar terlalu banyak parts sekaligus. Mula dengan Dran Buster 1-60 Low Flat jika mahu ujian attack tulen, kemudian bandingkan dengan Dran Buster 3-60 Rush dan Dran Buster 5-60 Point. Setiap setup mengajar versi attack yang berbeza.\n\nLow Flat memberi kelajuan kuat dan tekanan sudut rendah, tetapi ia juga meningkatkan risiko self-KO. Rush boleh menjadikan Dran Buster lebih mudah dikawal sambil mengekalkan identiti attack. Point memberi pelan sandaran jika attack pembukaan tidak tamatkan battle segera.\n\nDran Buster mahu lawan membuat keputusan dengan cepat. Melawan stamina, ia perlu mencabar sebelum late game. Melawan defense, ia perlukan contact bersih dan bukan hit lemah berulang. Melawan build attack lain, launch yang lebih baik selalunya menentukan match.\n\nUjian Dran Buster yang baik ialah menjalankan sepuluh battle dengan setup sama dan mencatat timing contact pertama. Jika contact pertama berlaku lewat, combo itu tidak menggunakan identiti direct attack. Jika contact awal tetapi keputusan tidak stabil, tune untuk kawalan dan bukan lebih kelajuan.",
      published_at: "2026-06-16"
    }
  ]
};

export function getLocalizedGuide(locale: GuideLocale, slug: string) {
  return localizedGuides[locale].find((guide) => guide.slug === slug);
}
