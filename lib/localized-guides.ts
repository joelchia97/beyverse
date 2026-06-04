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
    }
  ]
};

export function getLocalizedGuide(locale: GuideLocale, slug: string) {
  return localizedGuides[locale].find((guide) => guide.slug === slug);
}
