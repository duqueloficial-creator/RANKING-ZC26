    /* ===================================================================
       ZC26 · Sistema de sonidos de navegación (carpeta /sound)
    =================================================================== */
    const ZC_SOUNDS = {
        entrar: "sound/entrar.ogg",
        salir: "sound/salir.ogg",
        cambio: "sound/cambio.ogg",
        master: "sound/master.ogg",
        legendary: "sound/legendary.ogg",
        mythic: "sound/mithyc.ogg",
        pro: "sound/PRORANK.ogg",
        click: "sound/click.ogg",
        clickentrar: "sound/clickentrar.ogg",
        clicksalir: "sound/clicksalir.ogg",
        salondelafama: "sound/salondelafama.ogg",
        cambioidioma: "sound/cambioidioma.ogg",
    };
    const ZC_SOUND_ACTIVE = [];
    let zcActiveRankAudio = null;
    let zcMuted = localStorage.getItem("zcMuted") === "1";
    function zcPlaySound(name) {
        if (zcMuted) return;
        const src = ZC_SOUNDS[name];
        if (!src) return;
        try {
            const audio = new Audio(src);
            audio.preload = "auto";
            audio.volume = 0.45;
            // Mantenemos una referencia activa: en algunos navegadores móviles
            // un <audio> sin referencias puede ser recolectado por el GC a
            // mitad de la reproducción, cortando el sonido.
            ZC_SOUND_ACTIVE.push(audio);
            const cleanup = () => {
                const idx = ZC_SOUND_ACTIVE.indexOf(audio);
                if (idx !== -1) ZC_SOUND_ACTIVE.splice(idx, 1);
            };
            audio.addEventListener("ended", cleanup);
            audio.addEventListener("error", cleanup);
            audio.play().catch(cleanup);
        } catch (e) {}
    }
    // Sonidos de rango (master/legendary/pro/mythic): son exclusivos entre
    // sí. Si ya hay uno sonando (por ejemplo al pasar rápido de un perfil
    // a otro), lo cortamos antes de reproducir el siguiente para que nunca
    // se acumulen ni se escuchen dos rangos a la vez.
    function zcPlayRankSound(name) {
        if (zcActiveRankAudio) {
            try {
                zcActiveRankAudio.pause();
                zcActiveRankAudio.currentTime = 0;
            } catch (e) {}
            zcActiveRankAudio = null;
        }
        if (zcMuted) return;
        const src = ZC_SOUNDS[name];
        if (!src) return;
        try {
            const audio = new Audio(src);
            audio.preload = "auto";
            audio.volume = 0.45;
            zcActiveRankAudio = audio;
            const cleanup = () => {
                if (zcActiveRankAudio === audio) zcActiveRankAudio = null;
            };
            audio.addEventListener("ended", cleanup);
            audio.addEventListener("error", cleanup);
            audio.play().catch(cleanup);
        } catch (e) {}
    }
    function zcStopRankSound() {
        if (zcActiveRankAudio) {
            try {
                zcActiveRankAudio.pause();
                zcActiveRankAudio.currentTime = 0;
            } catch (e) {}
            zcActiveRankAudio = null;
        }
    }
    function zcUpdateMuteIcon() {
        const icon = document.getElementById("soundMuteIcon");
        if (icon) icon.src = zcMuted ? "sound_onmuted.png" : "sound_offmuted.png";
        const btn = document.getElementById("soundMuteBtn");
        if (btn) btn.setAttribute("aria-pressed", zcMuted ? "true" : "false");
    }
    function zcToggleMute() {
        zcMuted = !zcMuted;
        localStorage.setItem("zcMuted", zcMuted ? "1" : "0");
        zcUpdateMuteIcon();
        if (!zcMuted) zcPlaySound("click");
    }
    const FLAGS = {
        ES: { file: "72px-Es_hd.png", name: "España", region: "EMEA (Europa, Medio Oriente y África)" },
        PE: { file: "72px-Pe_hd.png", name: "Perú", region: "Sudamérica" },
        GT: { file: "72px-Gt_hd.png", name: "Guatemala", region: "Norteamérica" },
        MX: { file: "72px-Mx_hd.png", name: "México", region: "Norteamérica" },
        AR: { file: "72px-Ar_hd.png", name: "Argentina", region: "Sudamérica" },
        CL: { file: "72px-Cl_hd.png", name: "Chile", region: "Sudamérica" },
        CO: { file: "72px-Co_hd.png", name: "Colombia", region: "Sudamérica" },
        BR: { file: "72px-Br_hd.png", name: "Brasil", region: "Sudamérica" },
        ECU: { file: "ECU.png", name: "Ecuador", region: "Sudamérica" },
        BOL: { file: "BOL.png", name: "Bolivia", region: "Sudamérica" },
        SLV: { file: "SLV.png", name: "El Salvador", region: "Norteamérica" },
        GHA: { file: "GHA.png", name: "Ghana", region: "EMEA (Europa, Medio Oriente y África)" },
        VEN: { file: "VEN.png", name: "Venezuela", region: "Sudamérica" },
        HON: { file: "HON.png", name: "Honduras", region: "Norteamérica" }
    };

    const PLAYERS = [
        {
            key: "taikisha",
            name: "iXLCross", country: "MX", team: "LEVIATÁN ESPORTS", teamTag: "LEV", points: 295,
            events: "1 (3v3)", titles: "Campeón", sets: "3 - 1", matches: "7 - 3",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["@x_xv", "タイキシャ", "Taikisha"],
            winnings: "$0", credits: "6,000 créditos",
            recent: [
                { date: "8 ago 2026", time: "UTC-5", teamA: "LEV", scoreA: 3, teamB: "LPR", scoreB: 1, tourney: "ZC26 · Gran Final" },
                { date: "8 ago 2026", time: "UTC-5", teamA: "WB", scoreA: 0, teamB: "LEV", scoreB: 3, tourney: "ZC26 · Semifinal" },
            ],
            achievements: [
                { date: "2026-08-08", place: "1°", tier: "Campeón", tournament: "ZC26 - Gran Final", teamA: "LEV", scoreA: 3, teamB: "LPR", scoreB: 1, result: "Campeón · 500 pts · +25 Estelar (Set 4) · +25 Bono MVP" },
            ]
        },
        {
            key: "julio",
            name: "Juliocr36D", country: "PE", team: "LEVIATÁN ESPORTS", teamTag: "LEV", points: 270,
            events: "1 (3v3)", titles: "Campeón", sets: "3 - 1", matches: "7 - 3",
            born: "Por confirmar", status: "Inactivo", role: "Player · Capitán",
            alternateIds: ["@juliocr36", "SK | Julio"],
            winnings: "$10.59", credits: "10,000 créditos",
            recent: [
                { date: "8 ago 2026", time: "UTC-5", teamA: "LEV", scoreA: 3, teamB: "LPR", scoreB: 1, tourney: "ZC26 · Gran Final" },
                { date: "8 ago 2026", time: "UTC-5", teamA: "WB", scoreA: 0, teamB: "LEV", scoreB: 3, tourney: "ZC26 · Semifinal" },
            ],
            achievements: [
                { date: "2026-08-08", place: "1°", tier: "Campeón", tournament: "ZC26 - Gran Final", teamA: "LEV", scoreA: 3, teamB: "LPR", scoreB: 1, result: "Campeón · 500 pts · +25 Estelar (Set 1)" },
            ]
        },
        {
            key: "jc",
            name: "JOAR", country: "PE", team: "LEVIATÁN ESPORTS", teamTag: "LEV", points: 270,
            events: "1 (3v3)", titles: "Campeón", sets: "3 - 1", matches: "7 - 3",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["JC", "~ T X -->JC"],
            winnings: "$0", credits: "10,000 créditos",
            recent: [
                { date: "8 ago 2026", time: "UTC-5", teamA: "LEV", scoreA: 3, teamB: "LPR", scoreB: 1, tourney: "ZC26 · Gran Final" },
                { date: "8 ago 2026", time: "UTC-5", teamA: "WB", scoreA: 0, teamB: "LEV", scoreB: 3, tourney: "ZC26 · Semifinal" },
            ],
            achievements: [
                { date: "2026-08-08", place: "1°", tier: "Campeón", tournament: "ZC26 - Gran Final", teamA: "LEV", scoreA: 3, teamB: "LPR", scoreB: 1, result: "Campeón · 500 pts · +25 Estelar (Set 3)" },
            ]
        },
        {
            key: "nacaru",
            name: "Nacaru", country: "MX", team: "Cachorritas repres.", teamTag: "LPR", points: 160,
            events: "1 (3v3)", titles: "Subcampeón", sets: "1 - 3", matches: "3 - 7",
            born: "Por confirmar", status: "Inactivo", role: "Player · Capitán",
            alternateIds: ["nacaruuh"],
            winnings: "$0", credits: "0 créditos",
            socials: [
                { platform: "TikTok", handle: "@nacaruuh", url: "https://www.tiktok.com/@nacaruuh?_r=1&_t=ZS-98yVcvwHqQ0" },
                { platform: "YouTube", handle: "@nacaruuh", url: "https://youtube.com/@nacaruuh?si=ejv9_5GaYrnpeAo3" }
            ],
            bsMaxTrophies: "89,000", bsRankedTier: "Master", bsRankedValue: "10300",
            recent: [
                { date: "8 ago 2026", time: "UTC-5", teamA: "LEV", scoreA: 3, teamB: "LPR", scoreB: 1, tourney: "ZC26 · Gran Final" },
                { date: "8 ago 2026", time: "UTC-5", teamA: "QQQ", scoreA: 0, teamB: "LPR", scoreB: 3, tourney: "ZC26 · Semifinal" },
            ],
            achievements: [
                { date: "2026-08-08", place: "2°", tier: "Subcampeón", tournament: "ZC26 - Gran Final", teamA: "LPR", scoreA: 1, teamB: "LEV", scoreB: 3, result: "Subcampeón · 250 pts · +25 Estelar (Set 2)" },
            ]
        },
        {
            key: "juanjo",
            name: "Juanjo", country: "GT", team: "Cachorritas repres.", teamTag: "LPR", points: 130,
            events: "2 (3v3/1v1)", titles: "Subcampeón", sets: "1 - 3", matches: "3 - 7",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["15_juanjoxd_28", "Juanjoxd"],
            winnings: "$0", credits: "1,000 créditos",
            recent: [
                { date: "8 ago 2026", time: "UTC-5", teamA: "LEV", scoreA: 3, teamB: "LPR", scoreB: 1, tourney: "ZC26 · Gran Final" },
                { date: "8 ago 2026", time: "UTC-5", teamA: "QQQ", scoreA: 0, teamB: "LPR", scoreB: 3, tourney: "ZC26 · Semifinal" },
            ],
            achievements: [
                { date: "2026-08-08", place: "2°", tier: "Subcampeón", tournament: "ZC26 - Gran Final", teamA: "LPR", scoreA: 1, teamB: "LEV", scoreB: 3, result: "Subcampeón · 250 pts" },
            ]
        },
        {
            key: "ninja",
            name: "Ninja", country: "MX", team: "Cachorritas repres.", teamTag: "LPR", points: 130,
            events: "1 (3v3)", titles: "Subcampeón", sets: "1 - 3", matches: "3 - 7",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["ninja._.1081"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "8 ago 2026", time: "UTC-5", teamA: "LEV", scoreA: 3, teamB: "LPR", scoreB: 1, tourney: "ZC26 · Gran Final" },
                { date: "8 ago 2026", time: "UTC-5", teamA: "QQQ", scoreA: 0, teamB: "LPR", scoreB: 3, tourney: "ZC26 · Semifinal" },
            ],
            achievements: [
                { date: "2026-08-08", place: "2°", tier: "Subcampeón", tournament: "ZC26 - Gran Final", teamA: "LPR", scoreA: 1, teamB: "LEV", scoreB: 3, result: "Subcampeón · 250 pts" },
            ]
        },
        {
            key: "alvaro",
            name: "Álvaro", country: "PE", team: "LEVIATÁN ESPORTS", teamTag: "LEV", points: 0,
            events: "1 (3v3)", titles: "Campeón", sets: "3 - 1", matches: "7 - 3",
            born: "Por confirmar", status: "Inactivo", role: "Player · Suplente",
            alternateIds: ["alva210"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "8 ago 2026", time: "UTC-5", teamA: "LEV", scoreA: 3, teamB: "LPR", scoreB: 1, tourney: "ZC26 · Gran Final" },
            ],
            achievements: [
                { date: "2026-08-08", place: "1°", tier: "Campeón", tournament: "ZC26 - Gran Final", teamA: "LEV", scoreA: 3, teamB: "LPR", scoreB: 1, result: "Campeón · Suplente (no disputó rondas)" },
            ]
        },
        {
            key: "diego",
            name: "Diego", country: "MX", team: "Jugador individual (1vs1)", teamTag: "", points: 98,
            events: "1 (1v1)", titles: "1er Lugar", sets: "4 - 0", matches: "9 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["DiegoU_c", "@Diego"],
            winnings: "$0", credits: "3,500 créditos",
            recent: [
                { date: "30 mar 2026", time: "UTC-5", teamA: "Diego", scoreA: 3, teamB: "4dr1", scoreB: 0, tourney: "ZC26 1v1 · Gran Final" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "Diego", scoreA: 2, teamB: "Javi", scoreB: 1, tourney: "ZC26 1v1 · Semifinal" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "Diego", scoreA: 2, teamB: "Zeta/papu", scoreB: 0, tourney: "ZC26 1v1 · Ronda 2" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "Diego", scoreA: 2, teamB: "Hetcr894", scoreB: 1, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: [
                { date: "2026-03-30", place: "1°", tier: "1er Lugar", tournament: "ZC26 1v1 - Gran Final", teamA: "Diego", scoreA: 3, teamB: "4dr1", scoreB: 0, result: "1er lugar · Sets 4 - 0 · PG-PP 9 - 2 · 120 pts" },
            ]
        },
        {
            key: "alan",
            name: "Alan", country: "BR", team: "Jugador individual (1vs1)", teamTag: "", points: 88,
            events: "1 (1v1)", titles: "1er Lugar", sets: "--", matches: "--",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["LcK alan55", "Alān"],
            winnings: "$0", credits: "3,500 créditos",
            recent: [
                { date: "29 mar 2026", time: "UTC-5", teamA: "Alān", scoreA: 2, teamB: "Me fies 5", scoreB: 0, tourney: "ZC26 1v1 · Gran Final" },
            ],
            achievements: [
                { date: "2026-03-29", place: "1°", tier: "1er Lugar", tournament: "ZC26 1v1 - Gran Final", teamA: "Alān", scoreA: 2, teamB: "Me fies 5", scoreB: 0, result: "1er lugar · 120 pts" },
            ]
        },
        {
            key: "freddy",
            name: "Freddy", country: "PE", team: "Jugador individual (1vs1)", teamTag: "", points: 88,
            events: "1 (1v1)", titles: "1er Lugar", sets: "--", matches: "--",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["Freddy", "freddy._jh", "Synse", "feedz", "Nine"],
            winnings: "$10", credits: "3,500 créditos",
            recent: [
                { date: "6 dic 2025", time: "UTC-5", teamA: "Freddy", scoreA: 2, teamB: "Sentryks", scoreB: 0, tourney: "ZC26 1v1 · Gran Final" },
            ],
            achievements: [
                { date: "2025-12-06", place: "1°", tier: "1er Lugar", tournament: "ZC26 1v1 - Gran Final", teamA: "Freddy", scoreA: 2, teamB: "Sentryks", scoreB: 0, result: "1er lugar · 120 pts" },
            ]
        },
        {
            key: "tiagoti",
            name: "Tiagoti", country: "ES", team: "WB", teamTag: "WB", points: 105,
            events: "1 (3v3)", titles: "3er Lugar", sets: "1 - 2", matches: "3 - 6",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["@Tiagoti BS"],
            winnings: "$0", credits: "500 créditos",
            recent: [
                { date: "8 ago 2026", time: "UTC-5", teamA: "WB", scoreA: 0, teamB: "LEV", scoreB: 3, tourney: "ZC26 · Semifinal" },
                { date: "8 ago 2026", time: "UTC-5", teamA: "WB", scoreA: 3, teamB: "QQQ", scoreB: 2, tourney: "ZC26 · 3er y 4to Lugar" },
            ],
            achievements: [
                { date: "2026-08-08", place: "3°", tier: "3er Lugar", tournament: "ZC26 - 3er y 4to Lugar", teamA: "WB", scoreA: 3, teamB: "QQQ", scoreB: 2, result: "3er lugar · 105 pts" },
            ]
        },
        {
            key: "aumc",
            name: "AUMC", country: "MX", team: "WB", teamTag: "WB", points: 105,
            events: "1 (3v3)", titles: "3er Lugar", sets: "1 - 2", matches: "3 - 6",
            born: "Por confirmar", status: "Inactivo", role: "Player · Capitán",
            alternateIds: ["@AUMCxD"],
            winnings: "$0", credits: "500 créditos",
            recent: [
                { date: "8 ago 2026", time: "UTC-5", teamA: "WB", scoreA: 0, teamB: "LEV", scoreB: 3, tourney: "ZC26 · Semifinal" },
                { date: "8 ago 2026", time: "UTC-5", teamA: "WB", scoreA: 3, teamB: "QQQ", scoreB: 2, tourney: "ZC26 · 3er y 4to Lugar" },
            ],
            achievements: [
                { date: "2026-08-08", place: "3°", tier: "3er Lugar", tournament: "ZC26 - 3er y 4to Lugar", teamA: "WB", scoreA: 3, teamB: "QQQ", scoreB: 2, result: "3er lugar · 105 pts" },
            ]
        },
        {
            key: "liam",
            name: "Liam", country: "MX", team: "WB", teamTag: "WB", points: 105,
            events: "1 (3v3)", titles: "3er Lugar", sets: "1 - 2", matches: "3 - 6",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["@liamno014"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "8 ago 2026", time: "UTC-5", teamA: "WB", scoreA: 0, teamB: "LEV", scoreB: 3, tourney: "ZC26 · Semifinal" },
                { date: "8 ago 2026", time: "UTC-5", teamA: "WB", scoreA: 3, teamB: "QQQ", scoreB: 2, tourney: "ZC26 · 3er y 4to Lugar" },
            ],
            achievements: [
                { date: "2026-08-08", place: "3°", tier: "3er Lugar", tournament: "ZC26 - 3er y 4to Lugar", teamA: "WB", scoreA: 3, teamB: "QQQ", scoreB: 2, result: "3er lugar · 105 pts" },
            ]
        },
        {
            key: "marcelo",
            name: "Marcelo", country: "AR", team: "QQQ", teamTag: "QQQ", points: 100,
            events: "1 (3v3)", titles: "4to Lugar", sets: "0 - 2", matches: "2 - 6",
            born: "Por confirmar", status: "Inactivo", role: "Player · Capitán",
            alternateIds: ["@marcelonigaman", "marcelogm"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "8 ago 2026", time: "UTC-5", teamA: "QQQ", scoreA: 0, teamB: "LPR", scoreB: 3, tourney: "ZC26 · Semifinal" },
                { date: "8 ago 2026", time: "UTC-5", teamA: "WB", scoreA: 3, teamB: "QQQ", scoreB: 2, tourney: "ZC26 · 3er y 4to Lugar" },
            ],
            achievements: [
                { date: "2026-08-08", place: "4°", tier: "4to Lugar", tournament: "ZC26 - 3er y 4to Lugar", teamA: "WB", scoreA: 3, teamB: "QQQ", scoreB: 2, result: "4to lugar · 100 pts" },
            ]
        },
        {
            key: "astro",
            name: "Astro", country: "PE", team: "QQQ", teamTag: "QQQ", points: 100,
            events: "1 (3v3)", titles: "4to Lugar", sets: "0 - 2", matches: "2 - 6",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["@Astro", "Astronomo"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "8 ago 2026", time: "UTC-5", teamA: "QQQ", scoreA: 0, teamB: "LPR", scoreB: 3, tourney: "ZC26 · Semifinal" },
                { date: "8 ago 2026", time: "UTC-5", teamA: "WB", scoreA: 3, teamB: "QQQ", scoreB: 2, tourney: "ZC26 · 3er y 4to Lugar" },
            ],
            achievements: [
                { date: "2026-08-08", place: "4°", tier: "4to Lugar", tournament: "ZC26 - 3er y 4to Lugar", teamA: "WB", scoreA: 3, teamB: "QQQ", scoreB: 2, result: "4to lugar · 100 pts" },
            ]
        },
        {
            key: "jmvll",
            name: "Jmvll", country: "PE", team: "QQQ", teamTag: "QQQ", points: 100,
            events: "1 (3v3)", titles: "4to Lugar", sets: "0 - 2", matches: "2 - 6",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["@Jmvll16", "jmvll"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "8 ago 2026", time: "UTC-5", teamA: "QQQ", scoreA: 0, teamB: "LPR", scoreB: 3, tourney: "ZC26 · Semifinal" },
                { date: "8 ago 2026", time: "UTC-5", teamA: "WB", scoreA: 3, teamB: "QQQ", scoreB: 2, tourney: "ZC26 · 3er y 4to Lugar" },
            ],
            achievements: [
                { date: "2026-08-08", place: "4°", tier: "4to Lugar", tournament: "ZC26 - 3er y 4to Lugar", teamA: "WB", scoreA: 3, teamB: "QQQ", scoreB: 2, result: "4to lugar · 100 pts" },
            ]
        },
        {
            key: "fies",
            name: "Fies", country: "AR", team: "Jugador individual (1vs1)", teamTag: "", points: 64,
            events: "2 (1v1)", titles: "2do Lugar", sets: "3 - 2", matches: "7 - 5",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["me fies 5?"],
            winnings: "$0", credits: "1,200 créditos",
            recent: [
                { date: "30 mar 2026", time: "UTC-5", teamA: "Javi", scoreA: 2, teamB: "Me fies 5?", scoreB: 1, tourney: "ZC26 1v1 · 3er y 4to Lugar" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "Me fies 5?", scoreA: 1, teamB: "4dr1", scoreB: 2, tourney: "ZC26 1v1 · Semifinal" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "Me fies 5?", scoreA: 2, teamB: "Kvaras", scoreB: 0, tourney: "ZC26 1v1 · Ronda 2" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "Me fies 5?", scoreA: 2, teamB: "ElKakas", scoreB: 0, tourney: "ZC26 1v1 · Ronda 1" },
                { date: "29 mar 2026", time: "UTC-5", teamA: "Alān", scoreA: 2, teamB: "Me fies 5", scoreB: 0, tourney: "ZC26 1v1 · Gran Final" },
            ],
            achievements: [
                { date: "2026-03-29", place: "2°", tier: "2do Lugar", tournament: "ZC26 1v1 - Gran Final", teamA: "Alān", scoreA: 2, teamB: "Me fies 5", scoreB: 0, result: "2do lugar · 80 pts" },
            ]
        },
        {
            key: "adri",
            name: "Adri", country: "ES", team: "Jugador individual (1vs1)", teamTag: "", points: 52,
            events: "1 (1v1)", titles: "2do Lugar", sets: "3 - 1", matches: "6 - 4",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["4dr1"],
            winnings: "$0", credits: "1,000 créditos",
            recent: [
                { date: "30 mar 2026", time: "UTC-5", teamA: "Diego", scoreA: 3, teamB: "4dr1", scoreB: 0, tourney: "ZC26 1v1 · Gran Final" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "Me fies 5?", scoreA: 1, teamB: "4dr1", scoreB: 2, tourney: "ZC26 1v1 · Semifinal" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "PapiRico", scoreA: 0, teamB: "4dr1", scoreB: 2, tourney: "ZC26 1v1 · Ronda 2" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "4dr1", scoreA: 2, teamB: "ZetalPapi Rick", scoreB: 0, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: [
                { date: "2026-03-30", place: "2°", tier: "2do Lugar", tournament: "ZC26 1v1 - Gran Final", teamA: "Diego", scoreA: 3, teamB: "4dr1", scoreB: 0, result: "2do lugar · Sets 3 - 1 · PG-PP 6 - 4 · 80 pts" },
            ]
        },
        {
            key: "sentryks",
            name: "Sentryks", country: "AR", team: "Jugador individual (1vs1)", teamTag: "", points: 48,
            events: "1 (1v1)", titles: "2do Lugar", sets: "--", matches: "--",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["@Sentryks"],
            winnings: "$0", credits: "2,500 créditos",
            recent: [
                { date: "6 dic 2025", time: "UTC-5", teamA: "Freddy", scoreA: 2, teamB: "Sentryks", scoreB: 0, tourney: "ZC26 1v1 · Gran Final" },
                { date: "6 dic 2025", time: "UTC-5", teamA: "Sentryks", scoreA: 2, teamB: "Deleted User", scoreB: 0, tourney: "ZC26 1v1 · Semifinal" },
            ],
            achievements: [
                { date: "2025-12-06", place: "2°", tier: "2do Lugar", tournament: "ZC26 1v1 - Gran Final", teamA: "Freddy", scoreA: 2, teamB: "Sentryks", scoreB: 0, result: "2do lugar · 80 pts" },
            ]
        },
        {
            key: "marcos",
            name: "Marcos", country: "MX", team: "Jugador individual (1vs1)", teamTag: "", points: 60,
            events: "1 (1v1)", titles: "", sets: "--", matches: "4 - 0",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["%ON/MARCOS%", "marcos1148"],
            winnings: "$0", credits: "0 créditos",
            recent: [],
            achievements: []
        },
        {
            key: "javi",
            name: "Javi", country: "ES", team: "Jugador individual (1vs1)", teamTag: "", points: 42,
            events: "3 (1v1)", titles: "3er Lugar", sets: "3 - 3", matches: "7 - 8",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["javi826378", "Jave"],
            winnings: "$0", credits: "700 créditos",
            recent: [
                { date: "27 ago 2026", time: "UTC-5", teamA: "Ulises", scoreA: 2, teamB: "Javi", scoreB: 0, tourney: "ZC26 1v1 · Ronda 1" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "Javi", scoreA: 2, teamB: "Me fies 5?", scoreB: 1, tourney: "ZC26 1v1 · 3er y 4to Lugar" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "Diego", scoreA: 2, teamB: "Javi", scoreB: 1, tourney: "ZC26 1v1 · Semifinal" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "Ramiriñogod", scoreA: 0, teamB: "Javi", scoreB: 2, tourney: "ZC26 1v1 · Ronda 2" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "Pato", scoreA: 1, teamB: "Javi", scoreB: 2, tourney: "ZC26 1v1 · Ronda 1" },
                { date: "29 mar 2026", time: "UTC-5", teamA: "Jhustin", scoreA: 2, teamB: "Jav", scoreB: 0, tourney: "ZC26 1v1 · 3er y 4to Lugar" },
            ],
            achievements: [
                { date: "2026-03-30", place: "3°", tier: "3er Lugar", tournament: "ZC26 1v1 - 3er y 4to Lugar", teamA: "Javi", scoreA: 2, teamB: "Me fies 5?", scoreB: 1, result: "3er lugar · Sets 3 - 2 · PG-PP 7 - 6 · 50 pts" },
            ]
        },
        {
            key: "jhustin",
            name: "Jhustin", country: "BR", team: "Jugador individual (1vs1)", teamTag: "", points: 20,
            events: "1 (1v1)", titles: "3er Lugar", sets: "--", matches: "--",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["Jhustin"],
            winnings: "$0", credits: "500 créditos",
            recent: [
                { date: "29 mar 2026", time: "UTC-5", teamA: "Jhustin", scoreA: 2, teamB: "Jav", scoreB: 0, tourney: "ZC26 1v1 · 3er y 4to Lugar" },
            ],
            achievements: [
                { date: "2026-03-29", place: "3°", tier: "3er Lugar", tournament: "ZC26 1v1 - 3er y 4to Lugar", teamA: "Jhustin", scoreA: 2, teamB: "Jav", scoreB: 0, result: "3er lugar · 50 pts" },
            ]
        },
        {
            key: "loneliness",
            name: "Loneliness", country: "BR", team: "Jugador individual (1vs1)", teamTag: "", points: 45,
            events: "1 (1v1)", titles: "", sets: "--", matches: "3 - 0",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [],
            achievements: []
        },
        {
            key: "kvaras",
            name: "Kvaras", country: "ES", team: "Jugador individual (1vs1)", teamTag: "", points: 30,
            events: "1 (1v1)", titles: "", sets: "1 - 1", matches: "2 - 3",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 mar 2026", time: "UTC-5", teamA: "Me fies 5?", scoreA: 2, teamB: "Kvaras", scoreB: 0, tourney: "ZC26 1v1 · Ronda 2" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "Jona", scoreA: 1, teamB: "Kvaras", scoreB: 2, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "papirico",
            name: "PapiRico", country: "AR", team: "Jugador individual (1vs1)", teamTag: "", points: 30,
            events: "1 (1v1)", titles: "", sets: "1 - 1", matches: "2 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["PapiRico//®"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 mar 2026", time: "UTC-5", teamA: "PapiRico", scoreA: 0, teamB: "4dr1", scoreB: 2, tourney: "ZC26 1v1 · Ronda 2" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "PapiRico", scoreA: 2, teamB: "JOSE PRIME", scoreB: 1, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "ramirino",
            name: "Ramiriño", country: "PE", team: "Jugador individual (1vs1)", teamTag: "", points: 30,
            events: "1 (1v1)", titles: "", sets: "1 - 1", matches: "2 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["Ramiriñogod"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 mar 2026", time: "UTC-5", teamA: "Ramiriñogod", scoreA: 0, teamB: "Javi", scoreB: 2, tourney: "ZC26 1v1 · Ronda 2" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "Ramiriñogod", scoreA: 2, teamB: "MateoTEODOP", scoreB: 0, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "zeta",
            name: "Zeta", country: "CO", team: "Jugador individual (1vs1)", teamTag: "", points: 30,
            events: "1 (1v1)", titles: "", sets: "1 - 1", matches: "2 - 3",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["Zeta", "papu"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 mar 2026", time: "UTC-5", teamA: "Diego", scoreA: 2, teamB: "Zeta/papu", scoreB: 0, tourney: "ZC26 1v1 · Ronda 2" },
                { date: "30 mar 2026", time: "UTC-5", teamA: "Zeta/papu", scoreA: 2, teamB: "BYE", scoreB: 0, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "jona",
            name: "Jona", country: "CL", team: "Jugador individual (1vs1)", teamTag: "", points: 15,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "1 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 mar 2026", time: "UTC-5", teamA: "Jona", scoreA: 1, teamB: "Kvaras", scoreB: 2, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "hetcr",
            name: "Hetcr", country: "AR", team: "Jugador individual (1vs1)", teamTag: "", points: 15,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "1 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["Hetcr894"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 mar 2026", time: "UTC-5", teamA: "Diego", scoreA: 2, teamB: "Hetcr894", scoreB: 1, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "pato",
            name: "Pato", country: "ES", team: "Jugador individual (1vs1)", teamTag: "", points: 15,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "1 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 mar 2026", time: "UTC-5", teamA: "Pato", scoreA: 1, teamB: "Javi", scoreB: 2, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "elkakas",
            name: "ElKakas", country: "BR", team: "Jugador individual (1vs1)", teamTag: "", points: 10,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "0 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 mar 2026", time: "UTC-5", teamA: "Me fies 5?", scoreA: 2, teamB: "ElKakas", scoreB: 0, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "joseprime",
            name: "Jose Prime", country: "MX", team: "Jugador individual (1vs1)", teamTag: "", points: 10,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "0 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["JOSE PRIME"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 mar 2026", time: "UTC-5", teamA: "PapiRico", scoreA: 2, teamB: "JOSE PRIME", scoreB: 1, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "zetal",
            name: "Zetal", country: "AR", team: "Jugador individual (1vs1)", teamTag: "", points: 10,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "0 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["ZetalPapi Rick"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 mar 2026", time: "UTC-5", teamA: "4dr1", scoreA: 2, teamB: "ZetalPapi Rick", scoreB: 0, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "mateo",
            name: "Mateo", country: "CL", team: "Jugador individual (1vs1)", teamTag: "", points: 10,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "0 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["MateoTEODOP"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 mar 2026", time: "UTC-5", teamA: "Ramiriñogod", scoreA: 2, teamB: "MateoTEODOP", scoreB: 0, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "robertbv",
            name: "RobertBV", country: "PE", team: "Jugador individual (1vs1)", teamTag: "", points: 116, prevPoints: 101,
            events: "2 (1v1)", titles: "1er Lugar", sets: "4 - 1", matches: "10 - 2",
            born: "Por confirmar", status: "Activo", role: "Player",
            alternateIds: ["Pibble", "robertbv2902", "Robert"],
            winnings: "$5.00", credits: "7,300 créditos",
            recent: [
                { date: "30 ago 2026", time: "UTC-5", teamA: "Zyrox", scoreA: 2, teamB: "RobertBV", scoreB: 1, tourney: "ZC26 1v1 Edición 4 · Ronda 1" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "RobertBV", scoreA: 3, teamB: "Sebas", scoreB: 0, tourney: "ZC26 1v1 · Gran Final" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "Zyrox", scoreA: 0, teamB: "RobertBV", scoreB: 2, tourney: "ZC26 1v1 · Semifinal" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "Kennediano", scoreA: 0, teamB: "RobertBV", scoreB: 2, tourney: "ZC26 1v1 · Ronda 2" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "RobertBV", scoreA: 2, teamB: "Santiago", scoreB: 0, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: [
                { date: "2026-08-27", place: "1°", tier: "1er Lugar", tournament: "ZC26 1v1 - Gran Final", teamA: "RobertBV", scoreA: 3, teamB: "Sebas", scoreB: 0, result: "1er lugar · Sets 4 - 0 · PG-PP 9 - 0 · 120 pts" },
            ]
        },
        {
            key: "sebas",
            name: "Sebas", country: "PE", team: "Jugador individual (1vs1)", teamTag: "", points: 52, prevPoints: 25,
            events: "1 (1v1)", titles: "2do Lugar", sets: "3 - 1", matches: "6 - 4",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "27 ago 2026", time: "UTC-5", teamA: "RobertBV", scoreA: 3, teamB: "Sebas", scoreB: 0, tourney: "ZC26 1v1 · Gran Final" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "Sebas", scoreA: 2, teamB: "Ulises", scoreB: 1, tourney: "ZC26 1v1 · Semifinal" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "Daniel17", scoreA: 0, teamB: "Sebas", scoreB: 2, tourney: "ZC26 1v1 · Ronda 2" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "Locito", scoreA: 0, teamB: "Sebas", scoreB: 2, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: [
                { date: "2026-08-27", place: "2°", tier: "2do Lugar", tournament: "ZC26 1v1 - Gran Final", teamA: "RobertBV", scoreA: 3, teamB: "Sebas", scoreB: 0, result: "2do lugar · Sets 3 - 1 · PG-PP 6 - 4 · 80 pts" },
            ]
        },
        {
            key: "zyrox",
            name: "Zyrox", country: "CL", team: "Jugador individual (1vs1)", teamTag: "", points: 145, prevPoints: 40,
            events: "2 (1v1)", titles: "1er Lugar", sets: "7 - 1", matches: "15 - 6",
            born: "Por confirmar", status: "Activo", role: "Player",
            alternateIds: ["hydra.drsxo", "hydra", "drsxo"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 ago 2026", time: "UTC-5", teamA: "Zyrox", scoreA: 3, teamB: "Heritage", scoreB: 2, tourney: "ZC26 1v1 Edición 4 · Gran Final" },
                { date: "30 ago 2026", time: "UTC-5", teamA: "Misery", scoreA: 0, teamB: "Zyrox", scoreB: 2, tourney: "ZC26 1v1 Edición 4 · Semifinal" },
                { date: "30 ago 2026", time: "UTC-5", teamA: "Zyrox", scoreA: 2, teamB: "peepe", scoreB: 1, tourney: "ZC26 1v1 Edición 4 · Ronda 2" },
                { date: "30 ago 2026", time: "UTC-5", teamA: "Zyrox", scoreA: 2, teamB: "RobertBV", scoreB: 1, tourney: "ZC26 1v1 Edición 4 · Ronda 1" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "Zyrox", scoreA: 2, teamB: "Ulises", scoreB: 0, tourney: "ZC26 1v1 · 3er y 4to Lugar" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "Zyrox", scoreA: 0, teamB: "RobertBV", scoreB: 2, tourney: "ZC26 1v1 · Semifinal" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "Zyrox", scoreA: 2, teamB: "SoyManco", scoreB: 0, tourney: "ZC26 1v1 · Ronda 2" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "Zyrox", scoreA: 2, teamB: "Douma", scoreB: 0, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: [
                { date: "2026-08-30", place: "1°", tier: "1er Lugar", tournament: "ZC26 1v1 Edición 4 - Gran Final", teamA: "Zyrox", scoreA: 3, teamB: "Heritage", scoreB: 2, result: "1er lugar · Sets 4 - 0 · PG-PP 9 - 4 · 120 pts" },
                { date: "2026-08-27", place: "3°", tier: "3er Lugar", tournament: "ZC26 1v1 - 3er y 4to Lugar", teamA: "Zyrox", scoreA: 2, teamB: "Ulises", scoreB: 0, result: "3er lugar · Sets 3 - 1 · PG-PP 6 - 2 · 50 pts" },
            ]
        },
        {
            key: "ulises",
            name: "Ulises", country: "MX", team: "Jugador individual (1vs1)", teamTag: "", points: 35, prevPoints: 21,
            events: "1 (1v1)", titles: "4to Lugar", sets: "2 - 2", matches: "5 - 4",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["ulis_sgm2"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "27 ago 2026", time: "UTC-5", teamA: "Zyrox", scoreA: 2, teamB: "Ulises", scoreB: 0, tourney: "ZC26 1v1 · 3er y 4to Lugar" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "Sebas", scoreA: 2, teamB: "Ulises", scoreB: 1, tourney: "ZC26 1v1 · Semifinal" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "Ulises", scoreA: 2, teamB: "Axelito", scoreB: 0, tourney: "ZC26 1v1 · Ronda 2" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "Ulises", scoreA: 2, teamB: "Javi", scoreB: 0, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: [
                { date: "2026-08-27", place: "4°", tier: "4to Lugar", tournament: "ZC26 1v1 - 3er y 4to Lugar", teamA: "Zyrox", scoreA: 2, teamB: "Ulises", scoreB: 0, result: "4to lugar · Sets 2 - 2 · PG-PP 5 - 4 · 45 pts" },
            ]
        },
        {
            key: "soymanco",
            name: "SoyManco", country: "VEN", team: "Jugador individual (1vs1)", teamTag: "", points: 30, prevPoints: 19,
            events: "1 (1v1)", titles: "", sets: "1 - 1", matches: "2 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "27 ago 2026", time: "UTC-5", teamA: "Zyrox", scoreA: 2, teamB: "SoyManco", scoreB: 0, tourney: "ZC26 1v1 · Ronda 2" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "Piero", scoreA: 0, teamB: "SoyManco", scoreB: 2, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "kennediano",
            name: "Kennediano", country: "GHA", team: "Jugador individual (1vs1)", teamTag: "", points: 30, prevPoints: 17,
            events: "1 (1v1)", titles: "", sets: "1 - 1", matches: "2 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "27 ago 2026", time: "UTC-5", teamA: "Kennediano", scoreA: 0, teamB: "RobertBV", scoreB: 2, tourney: "ZC26 1v1 · Ronda 2" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "Kennediano", scoreA: 2, teamB: "Comter24", scoreB: 0, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "daniel17",
            name: "Daniel", country: "SLV", team: "Jugador individual (1vs1)", teamTag: "", points: 30, prevPoints: 15,
            events: "1 (1v1)", titles: "", sets: "1 - 1", matches: "2 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["Daniel17", "dani30284"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "27 ago 2026", time: "UTC-5", teamA: "Daniel17", scoreA: 0, teamB: "Sebas", scoreB: 2, tourney: "ZC26 1v1 · Ronda 2" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "Yamil", scoreA: 0, teamB: "Daniel17", scoreB: 2, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "axelito",
            name: "Axelito", country: "MX", team: "Jugador individual (1vs1)", teamTag: "", points: 30, prevPoints: 13,
            events: "1 (1v1)", titles: "", sets: "1 - 1", matches: "2 - 3",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "27 ago 2026", time: "UTC-5", teamA: "Ulises", scoreA: 2, teamB: "Axelito", scoreB: 0, tourney: "ZC26 1v1 · Ronda 2" },
                { date: "27 ago 2026", time: "UTC-5", teamA: "Axelito", scoreA: 2, teamB: "Yamil 2", scoreB: 1, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "douma",
            name: "Douma", country: "AR", team: "Jugador individual (1vs1)", teamTag: "", points: 10,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "0 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "27 ago 2026", time: "UTC-5", teamA: "Zyrox", scoreA: 2, teamB: "Douma", scoreB: 0, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "piero",
            name: "Piero", country: "CL", team: "Jugador individual (1vs1)", teamTag: "", points: 10,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "0 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "27 ago 2026", time: "UTC-5", teamA: "Piero", scoreA: 0, teamB: "SoyManco", scoreB: 2, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "comter24",
            name: "Conter", country: "ECU", team: "Jugador individual (1vs1)", teamTag: "", points: 10,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "0 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: ["conter158", "Comter24"],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "27 ago 2026", time: "UTC-5", teamA: "Kennediano", scoreA: 2, teamB: "Comter24", scoreB: 0, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "santiago",
            name: "Santiago", country: "ES", team: "Jugador individual (1vs1)", teamTag: "", points: 10,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "0 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "27 ago 2026", time: "UTC-5", teamA: "RobertBV", scoreA: 2, teamB: "Santiago", scoreB: 0, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "yamil",
            name: "Yamil", country: "BOL", team: "Jugador individual (1vs1)", teamTag: "", points: 10,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "0 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "27 ago 2026", time: "UTC-5", teamA: "Yamil", scoreA: 0, teamB: "Daniel17", scoreB: 2, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "locito",
            name: "Locito", country: "AR", team: "Jugador individual (1vs1)", teamTag: "", points: 10,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "0 - 2",
            born: "Por confirmar", status: "Inactivo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "27 ago 2026", time: "UTC-5", teamA: "Locito", scoreA: 0, teamB: "Sebas", scoreB: 2, tourney: "ZC26 1v1 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "heritage",
            name: "Heritage", country: "PE", team: "Jugador individual (1vs1)", teamTag: "", points: 52,
            events: "1 (1v1)", titles: "2do Lugar", sets: "3 - 1", matches: "8 - 4",
            born: "Por confirmar", status: "Activo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 ago 2026", time: "UTC-5", teamA: "Zyrox", scoreA: 3, teamB: "Heritage", scoreB: 2, tourney: "ZC26 1v1 Edición 4 · Gran Final" },
                { date: "30 ago 2026", time: "UTC-5", teamA: "Heritage", scoreA: 2, teamB: "Kaiser", scoreB: 1, tourney: "ZC26 1v1 Edición 4 · Semifinal" },
                { date: "30 ago 2026", time: "UTC-5", teamA: "Heritage", scoreA: 2, teamB: "Owneronyt", scoreB: 0, tourney: "ZC26 1v1 Edición 4 · Ronda 2" },
                { date: "30 ago 2026", time: "UTC-5", teamA: "Heritage", scoreA: 2, teamB: "Th/team negro", scoreB: 0, tourney: "ZC26 1v1 Edición 4 · Ronda 1" },
            ],
            achievements: [
                { date: "2026-08-30", place: "2°", tier: "2do Lugar", tournament: "ZC26 1v1 Edición 4 - Gran Final", teamA: "Zyrox", scoreA: 3, teamB: "Heritage", scoreB: 2, result: "2do lugar · Sets 3 - 1 · PG-PP 8 - 4 · 80 pts" },
            ]
        },
        {
            key: "kaiser",
            name: "Kaiser", country: "PE", team: "Jugador individual (1vs1)", teamTag: "", points: 40,
            events: "1 (1v1)", titles: "3er Lugar", sets: "3 - 1", matches: "7 - 2",
            born: "Por confirmar", status: "Activo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 ago 2026", time: "UTC-5", teamA: "Misery", scoreA: 0, teamB: "Kaiser", scoreB: 2, tourney: "ZC26 1v1 Edición 4 · 3er y 4to Lugar" },
                { date: "30 ago 2026", time: "UTC-5", teamA: "Heritage", scoreA: 2, teamB: "Kaiser", scoreB: 1, tourney: "ZC26 1v1 Edición 4 · Semifinal" },
                { date: "30 ago 2026", time: "UTC-5", teamA: "Aaron13", scoreA: 0, teamB: "Kaiser", scoreB: 2, tourney: "ZC26 1v1 Edición 4 · Ronda 2" },
                { date: "30 ago 2026", time: "UTC-5", teamA: "TH | herian", scoreA: 0, teamB: "Kaiser", scoreB: 2, tourney: "ZC26 1v1 Edición 4 · Ronda 1" },
            ],
            achievements: [
                { date: "2026-08-30", place: "3°", tier: "3er Lugar", tournament: "ZC26 1v1 Edición 4 - 3er y 4to Lugar", teamA: "Misery", scoreA: 0, teamB: "Kaiser", scoreB: 2, result: "3er lugar · Sets 3 - 1 · PG-PP 7 - 2 · 50 pts" },
            ]
        },
        {
            key: "misery",
            name: "Misery", country: "MX", team: "Jugador individual (1vs1)", teamTag: "", points: 35,
            events: "1 (1v1)", titles: "4to Lugar", sets: "2 - 2", matches: "4 - 4",
            born: "Por confirmar", status: "Activo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 ago 2026", time: "UTC-5", teamA: "Misery", scoreA: 0, teamB: "Kaiser", scoreB: 2, tourney: "ZC26 1v1 Edición 4 · 3er y 4to Lugar" },
                { date: "30 ago 2026", time: "UTC-5", teamA: "Misery", scoreA: 0, teamB: "Zyrox", scoreB: 2, tourney: "ZC26 1v1 Edición 4 · Semifinal" },
                { date: "30 ago 2026", time: "UTC-5", teamA: "Misery", scoreA: 2, teamB: "jormargg", scoreB: 0, tourney: "ZC26 1v1 Edición 4 · Ronda 2" },
                { date: "30 ago 2026", time: "UTC-5", teamA: "Misery", scoreA: 2, teamB: "obito", scoreB: 0, tourney: "ZC26 1v1 Edición 4 · Ronda 1" },
            ],
            achievements: [
                { date: "2026-08-30", place: "4°", tier: "4to Lugar", tournament: "ZC26 1v1 Edición 4 - 3er y 4to Lugar", teamA: "Misery", scoreA: 0, teamB: "Kaiser", scoreB: 2, result: "4to lugar · Sets 2 - 2 · PG-PP 4 - 4 · 45 pts" },
            ]
        },
        {
            key: "jormargg",
            name: "jormargg", country: "ES", team: "Jugador individual (1vs1)", teamTag: "", points: 30,
            events: "1 (1v1)", titles: "", sets: "1 - 1", matches: "2 - 3",
            born: "Por confirmar", status: "Activo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 ago 2026", time: "UTC-5", teamA: "Misery", scoreA: 2, teamB: "jormargg", scoreB: 0, tourney: "ZC26 1v1 Edición 4 · Ronda 2" },
                { date: "30 ago 2026", time: "UTC-5", teamA: "Remot_BS", scoreA: 1, teamB: "jormargg", scoreB: 2, tourney: "ZC26 1v1 Edición 4 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "peepe",
            name: "peepe", country: "CO", team: "Jugador individual (1vs1)", teamTag: "", points: 30,
            events: "1 (1v1)", titles: "", sets: "1 - 1", matches: "3 - 2",
            born: "Por confirmar", status: "Activo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 ago 2026", time: "UTC-5", teamA: "Zyrox", scoreA: 2, teamB: "peepe", scoreB: 1, tourney: "ZC26 1v1 Edición 4 · Ronda 2" },
                { date: "30 ago 2026", time: "UTC-5", teamA: "Tiago XCV", scoreA: 0, teamB: "peepe", scoreB: 2, tourney: "ZC26 1v1 Edición 4 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "owneronyt",
            name: "Owneronyt", country: "HON", team: "Jugador individual (1vs1)", teamTag: "", points: 30,
            events: "1 (1v1)", titles: "", sets: "1 - 1", matches: "2 - 2",
            born: "Por confirmar", status: "Activo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 ago 2026", time: "UTC-5", teamA: "Heritage", scoreA: 2, teamB: "Owneronyt", scoreB: 0, tourney: "ZC26 1v1 Edición 4 · Ronda 2" },
                { date: "30 ago 2026", time: "UTC-5", teamA: "Owneronyt", scoreA: 2, teamB: "Yanielgg", scoreB: 0, tourney: "ZC26 1v1 Edición 4 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "aaron13",
            name: "Aaron13", country: "GT", team: "Jugador individual (1vs1)", teamTag: "", points: 30,
            events: "1 (1v1)", titles: "", sets: "1 - 1", matches: "2 - 2",
            born: "Por confirmar", status: "Activo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 ago 2026", time: "UTC-5", teamA: "Aaron13", scoreA: 0, teamB: "Kaiser", scoreB: 2, tourney: "ZC26 1v1 Edición 4 · Ronda 2" },
                { date: "30 ago 2026", time: "UTC-5", teamA: "Kittypou26", scoreA: 0, teamB: "Aaron13", scoreB: 2, tourney: "ZC26 1v1 Edición 4 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "obito",
            name: "obito", country: "CO", team: "Jugador individual (1vs1)", teamTag: "", points: 10,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "0 - 2",
            born: "Por confirmar", status: "Activo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 ago 2026", time: "UTC-5", teamA: "Misery", scoreA: 2, teamB: "obito", scoreB: 0, tourney: "ZC26 1v1 Edición 4 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "remot_bs",
            name: "Remot_BS", country: "ES", team: "Jugador individual (1vs1)", teamTag: "", points: 15,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "1 - 2",
            born: "Por confirmar", status: "Activo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 ago 2026", time: "UTC-5", teamA: "Remot_BS", scoreA: 1, teamB: "jormargg", scoreB: 2, tourney: "ZC26 1v1 Edición 4 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "tiagoxcv",
            name: "Tiago XCV", country: "BOL", team: "Jugador individual (1vs1)", teamTag: "", points: 10,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "0 - 2",
            born: "Por confirmar", status: "Activo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 ago 2026", time: "UTC-5", teamA: "Tiago XCV", scoreA: 0, teamB: "peepe", scoreB: 2, tourney: "ZC26 1v1 Edición 4 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "thteamnegro",
            name: "Th/team negro", country: "CO", team: "Jugador individual (1vs1)", teamTag: "", points: 10,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "0 - 2",
            born: "Por confirmar", status: "Activo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 ago 2026", time: "UTC-5", teamA: "Heritage", scoreA: 2, teamB: "Th/team negro", scoreB: 0, tourney: "ZC26 1v1 Edición 4 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "yanielgg",
            name: "Yanielgg", country: "ES", team: "Jugador individual (1vs1)", teamTag: "", points: 10,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "0 - 2",
            born: "Por confirmar", status: "Activo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 ago 2026", time: "UTC-5", teamA: "Owneronyt", scoreA: 2, teamB: "Yanielgg", scoreB: 0, tourney: "ZC26 1v1 Edición 4 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "kittypou26",
            name: "Kittypou26", country: "PE", team: "Jugador individual (1vs1)", teamTag: "", points: 10,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "0 - 2",
            born: "Por confirmar", status: "Activo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 ago 2026", time: "UTC-5", teamA: "Kittypou26", scoreA: 0, teamB: "Aaron13", scoreB: 2, tourney: "ZC26 1v1 Edición 4 · Ronda 1" },
            ],
            achievements: []
        },
        {
            key: "thherian",
            name: "TH | herian", country: "ES", team: "Jugador individual (1vs1)", teamTag: "", points: 10,
            events: "1 (1v1)", titles: "", sets: "0 - 1", matches: "0 - 2",
            born: "Por confirmar", status: "Activo", role: "Player",
            alternateIds: [],
            winnings: "$0", credits: "0 créditos",
            recent: [
                { date: "30 ago 2026", time: "UTC-5", teamA: "TH | herian", scoreA: 0, teamB: "Kaiser", scoreB: 2, tourney: "ZC26 1v1 Edición 4 · Ronda 1" },
            ],
            achievements: []
        },
    ];

    // --- Sistema de desempate por puntos decimales ---
    // Se ordena primero por puntos base y, dentro de cada grupo empatado,
    // se reparte un pequeño bono decimal (a modo de "bono por rivales vencidos
    // de mayor puntuación") para que nunca existan dos jugadores con el mismo
    // puntaje final, resolviendo así los empates de la clasificación.
    PLAYERS.sort((a, b) => b.points - a.points);
    (function applyPointsTiebreak() {
        let i = 0;
        while (i < PLAYERS.length) {
            let j = i;
            while (j < PLAYERS.length && PLAYERS[j].points === PLAYERS[i].points) j++;
            const n = j - i;
            const step = n > 1 ? 0.32 / n : 0;
            for (let k = 0; k < n; k++) {
                PLAYERS[i + k].points = +(PLAYERS[i + k].points + (n - k) * step).toFixed(2);
            }
            i = j;
        }
    })();

    // --- Movimiento en la clasificación (sube / baja / nuevo) ---
    // Se calcula de forma real, al estilo Elo: se compara la posición de
    // cada jugador antes y después, pero SOLO dentro del conjunto de
    // jugadores que ya existían (los nuevos de este torneo no cuentan para
    // esta comparación, ni antes ni después). Así, agregar jugadores nuevos
    // al ranking no empuja artificialmente a todos los demás hacia abajo:
    // solo baja quien fue realmente superado por alguien que sumó puntos, y
    // sube quien fue superado por alguien que perdió terreno relativo.
    const RANK_NEW_PLAYERS = new Set(["heritage", "kaiser", "misery", "jormargg", "peepe", "owneronyt", "aaron13", "obito", "remot_bs", "tiagoxcv", "thteamnegro", "yanielgg", "kittypou26", "thherian"]);
    const RETURNING_PLAYERS = PLAYERS.filter(p => !RANK_NEW_PLAYERS.has(p.key));
    const PREV_POS_BY_KEY = new Map(
        RETURNING_PLAYERS.slice()
            .sort((a, b) => (b.prevPoints ?? b.points) - (a.prevPoints ?? a.points))
            .map((p, i) => [p.key, i + 1])
    );
    const CURR_POS_AMONG_RETURNING_BY_KEY = new Map(
        RETURNING_PLAYERS.slice()
            .sort((a, b) => b.points - a.points)
            .map((p, i) => [p.key, i + 1])
    );

    /* ===================================================================
       ZC26 · Nuevo diseño del ranking: rangos por posición, región e
       íconos de personaje (video/gif) por jugador.
    =================================================================== */
    // Escalón de rangos (sin numeración por niveles): Combat Grandmaster
    // (top 7) -> Combat Master (siguientes 30) -> Combat Ace (siguientes
    // 60) -> Mythic Rank (el resto). "kind" se usa para el sonido y el
    // color del brillo al abrir el perfil de un jugador.
    const ZC_RANK_ICONS = {
        pro: "Pro_pl.png",
        master: "Masters_pl.png",
        legendary: "Legendary_pl.png",
        mythic: "Mythic_pl.png"
    };
    function getRankTier(pos) {
        if (pos <= 7) {
            return { label: "Immortal Combat", icon: ZC_RANK_ICONS.pro, kind: "pro" };
        }
        if (pos <= 37) {
            return { label: "Master Combat", icon: ZC_RANK_ICONS.master, kind: "master" };
        }
        if (pos <= 97) {
            return { label: "As Combat", icon: ZC_RANK_ICONS.legendary, kind: "legendary" };
        }
        return { label: "Rango Mítico", icon: ZC_RANK_ICONS.mythic, kind: "mythic" };
    }
    const ZC_REGION_BY_COUNTRY = {
        AR: "SA", BOL: "SA", BR: "SA", CL: "SA", CO: "SA", ECU: "SA", PE: "SA", VEN: "SA",
        MX: "NA", GT: "NA", HON: "NA", SLV: "NA",
        ES: "EMEA", GHA: "EMEA",
    };
    function getRegion(countryCode) {
        return ZC_REGION_BY_COUNTRY[countryCode] || "—";
    }
    const ZC_REGION_LABELS = { SA: "SA", NA: "NA", EMEA: "EU", ASIA: "AS" };
    function getRegionLabel(regionKey) {
        return ZC_REGION_LABELS[regionKey] || regionKey;
    }

    // Ícono de jugador (avatar) junto al nombre. Todos usan "default.png"
    // salvo los que tienen uno propio asignado aquí.
    const ZC_PLAYER_ICON_DEFAULT = "default.png";
    const ZC_PLAYER_ICON = {
        julio: "28000299.png",
        taikisha: "player_icon_starrnova1.png",
        jc: "player_icon_sandy_overcharge.gif",
        robertbv: "lv_0_20260831235002.gif",
        freddy: "ezgif-58de1bf50089eef1.gif",
        zyrox: "profile_icon_meg_jungle.png",
        // Overrides específicos pedidos
        aumc: "player_icon_alli1.png",
        nacaru: "player_icon_lny24_1.png",
        // Jugadores con logro (1er/2do de 1v1, subcampeón de 3v3, o 3er/4to puesto)
        // Cada ícono se usa una sola vez en toda la tabla; no alcanza para
        // los 21 jugadores con logro, así que los últimos quedan sin ícono
        // (usan default.png) en vez de repetir uno ya usado.
        juanjo: "player_icon_surge_lunar.png",
        ninja: "player_icon_gigi1.png",
        diego: "player_icon_propass_4.png",
        alan: "player_icon_bp_nano.png",
        tiagoti: "profile_icon_rico_loaded.png",
        liam: "player_icon_champioship_hand.gif",
        marcelo: "player_icon_finx_starrgirl.png",
        astro: "player_icon_moe_2.png",
        jmvll: "player_icon_geisha1.png",
        fies: "player_icon_mandy_mecha.png",
        adri: "player_icon_aprilfools.png",
        sentryks: "player_icon_bp_windstock.png",
    };
    function playerIconHtml(key) {
        const src = ZC_PLAYER_ICON[key] || ZC_PLAYER_ICON_DEFAULT;
        return `<img class="rank-player-icon" src="assets/icons/${src}" alt="" onerror="this.style.visibility='hidden'">`;
    }

    function getRankChange(key) {
        if (RANK_NEW_PLAYERS.has(key)) return { type: "new" };
        // Comparación real de posición: si alguien sube porque ganó puntos,
        // a quienes pasó en la tabla les corresponde bajar esa misma cantidad
        // de puestos (así funciona el ranking real, incluido el de la FIFA).
        const prevPos = PREV_POS_BY_KEY.get(key);
        const currPos = CURR_POS_AMONG_RETURNING_BY_KEY.get(key);
        if (prevPos == null || currPos == null) return { type: "same" };
        const delta = prevPos - currPos; // posición anterior menor número = mejor puesto
        if (delta === 0) return { type: "same" };
        return { type: delta > 0 ? "up" : "down", value: Math.abs(delta) };
    }
    function rankChangeHtml(change) {
        if (change.type === "new") return `<span class="rank-change new">N</span>`;
        if (change.type === "same") return `<span class="rank-change same"></span>`;
        const sign = change.type === "up" ? "+" : "−";
        return `<span class="rank-change ${change.type}"><span class="rank-arrow">${sign}</span>${change.value}</span>`;
    }

    // --- Datos destacados por jugador (histórico ilustrativo de clasificación) ---
    function computeHighlights(pos, total) {
        const seed = (pos * 7) % 11;
        const best = Math.max(1, pos - (1 + (seed % 4)));
        const worst = Math.min(total, pos + (2 + (seed % 5)));
        const avg = Math.round(((best + worst + pos) / 3) * 10) / 10;
        const maxRise = 1 + (seed % 6);
        const maxFall = 1 + ((seed + 3) % 5);
        return { current: pos, best, worst, avg, maxRise, maxFall };
    }
    const TROPHIES = [
        {
            team: "LEVIATÁN ESPORT", logo: "LEV.png",
            champDate: "Campeón 09-08-2026",
            tourney: "ZC26 GRAN FINAL",
            mode: "Modalidad: 3 vs 3 · Bo5 · Tier S",
            desc: "LEVIATÁN ESPORTS se coronó campeón de la Gran Final ZC26 el 09/08/26 tras vencer 3-1 a Cachorritas repres (LPR). Título obtenido con la alineación de Julio (capitán), iXLCross y JOAR.",
            full: true
        }
    ];

    function flagImg(code, size) {
        const f = FLAGS[code];
        return `<img src="assets/flags/${f.file}" alt="${f.name}" title="${f.name}" style="${size ? 'width:100%;height:100%;object-fit:cover;' : ''}">`;
    }

    const CONTRIBUTIONS = [
        {
            name: "IstZephyra", country: "PE", amount: 47.68, bestAmount: 27.09,
            status: "Activo", supportTeam: "LEVIATÁN ESPORTS",
            alternateIds: ["Zephyra", "byezephyra", "byzephyra"],
            socials: [
                { platform: "TikTok", handle: "@byzephyra", url: "https://www.tiktok.com/@byzephyra?_r=1&_t=ZS-98uYe3DX0JJ" },
                { platform: "YouTube", handle: "@byzephyra", url: "https://www.youtube.com/@IstZephyra" },
                { platform: "Instagram", handle: "@byezephyra", url: "https://www.instagram.com/byezephyra?igsh=Yzc4ODZiMm5hMzFs" }
            ]
        }
    ];
    let contribExpanded = false;
    const CONTRIB_TOP_COUNT = 10;

    function renderContributions() {
        const list = document.getElementById("contribList");
        if (!list) return;
        const visible = contribExpanded ? CONTRIBUTIONS : CONTRIBUTIONS.slice(0, CONTRIB_TOP_COUNT);
        list.innerHTML = visible.map((c, i) => {
            const pos = i + 1;
            const medal = pos === 1 ? "gold" : pos === 2 ? "silver" : pos === 3 ? "bronze" : "";
            const rowTier = pos === 1 ? "tier-gold" : pos === 2 ? "tier-silver" : pos === 3 ? "tier-bronze" : (pos >= 4 && pos <= 7) ? "tier-gray" : "";
            return `
            <div class="rank-item" data-index="${i}">
                <div class="rank-row ${rowTier}" data-toggle-contrib="${i}" tabindex="0" role="button" aria-expanded="false">
                    <span class="rank-pos ${medal}">${pos}</span>
                    <span class="rank-flag">${flagImg(c.country, true)}</span>
                    <button class="rank-name ${medal}" data-open-contrib="${i}">${c.name}</button>
                    <span class="rank-meta">
                        <span class="rank-points">$${c.amount.toFixed(2)}</span>
                    </span>
                </div>
                <div class="rank-detail">
                    <div class="rank-detail-inner">
                        <div class="rank-detail-title full">Datos destacados</div>
                        <div class="rank-highlight-grid full">
                            <div class="rank-highlight-item"><span class="rank-highlight-value ${medal}">${pos}º</span><span class="rank-highlight-label">Clasificación actual</span></div>
                            <div class="rank-highlight-item"><span class="rank-highlight-value">$${c.amount.toFixed(2)}</span><span class="rank-highlight-label">Contribución total</span></div>
                            <div class="rank-highlight-item"><span class="rank-highlight-value">$${c.bestAmount.toFixed(2)}</span><span class="rank-highlight-label">Mejor contribución</span></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        }).join("");
        list.querySelectorAll("[data-toggle-contrib]").forEach(row => {
            const toggle = () => {
                const item = row.closest(".rank-item");
                const open = item.classList.toggle("open");
                zcPlaySound(open ? "clickentrar" : "clicksalir");
                row.setAttribute("aria-expanded", open ? "true" : "false");
            };
            row.addEventListener("click", toggle);
            row.addEventListener("keydown", e => {
                if (e.target === row && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); toggle(); }
            });
        });
        list.querySelectorAll("[data-open-contrib]").forEach(nameBtn => {
            nameBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                const idx = Number(nameBtn.dataset.openContrib);
                openContribModal(CONTRIBUTIONS[idx], idx + 1);
            });
        });
    }

    function openContribModal(c, pos) {
        const panel = document.getElementById("playerInfoPanel");
        panel.onscroll = null;
        const medal = pos === 1 ? "gold" : pos === 2 ? "silver" : pos === 3 ? "bronze" : "";
        panel.className = `info-panel ${medal}`.trim();
        panel.style.backgroundImage = "";
        const socialsHtml = (c.socials && c.socials.length)
            ? `<div class="contrib-social-list">${c.socials.map(s => `<a class="contrib-social-item" href="${s.url}" target="_blank" rel="noopener"><span class="contrib-social-handle">${s.handle}</span><span class="contrib-social-platform">${s.platform}</span></a>`).join("")}</div>`
            : `<div class="info-field-value muted">Por confirmar</div>`;
        panel.innerHTML = `<div class="panel-content">
            <div class="info-top-row">
                <div class="info-position-line">
                    <span class="info-pos-badge ${medal} ${posTierClass(pos)}">${pos}</span>
                    <span class="info-position-label">Posición en el ranking</span>
                </div>
                <span class="info-close-x">✕</span>
            </div>
            <div class="info-name"><span class="info-flag">${flagImg(c.country, true)}</span>${c.name}</div>

            <div class="info-block-title">Información</div>
            <div class="info-grid">
                <div><div class="info-field-label">Nacionalidad</div><div class="info-field-value">${FLAGS[c.country].name}</div></div>
                <div><div class="info-field-label">Región</div><div class="info-field-value">${FLAGS[c.country].region}</div></div>
                <div><div class="info-field-label">Estado</div><div class="info-field-value ${c.status === "Activo" ? "active" : "inactive"}">${c.status}</div></div>
                <div><div class="info-field-label">Contribucion</div><div class="info-field-value">$${c.amount.toFixed(2)}</div></div>
                <div><div class="info-field-label">Equipo de Apoyo</div><div class="info-field-value">${c.supportTeam}</div></div>
                <div><div class="info-field-label">IDs alternos</div><div class="info-field-value">${c.alternateIds.join(", ")}</div></div>
                <div class="span-2"><div class="info-field-label">Redes sociales</div>${socialsHtml}</div>
            </div>
        </div>`;
        panel.scrollTop = 0;
        openModal("playerModalOverlay");
    }

    /* ===================================================================
       ZC26 · Lógica del Filtro de Ranking (bloque independiente, prefijo "zcf")
       No modifica variables/funciones existentes, solo las consulta.
    =================================================================== */
    let zcfSearchQuery = "";
    let zcfSelectedRegions = new Set();
    let zcfSelectedCountries = new Set();
    let zcfSelectedActivity = new Set();
    let zcfSelectedMovement = new Set();
    let zcfSelectedAchievements = new Set();
    let zcfSortOrder = "desc"; // "desc" = Top 1 primero (mayor a menor) · "asc" = último del top primero (menor a mayor)

    function zcFormatPoints(value, opts) {
        opts = opts || {};
        const negative = value < 0;
        const abs = Math.abs(value);
        const parts = abs.toFixed(2).split(".");
        const sign = negative ? "-" : (opts.showPlus ? "+" : "");
        return `${sign}${parts[0]}<span class="zcf-pts-dec">.${parts[1]}</span>`;
    }

    function zcfNormalize(str) {
        return (str || "").toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    function zcfGetRegionCode(country) {
        // Usa el mismo mapeo país → región que el resto del sitio (getRegion),
        // en vez de comparar contra el texto de FLAGS[country].region, que está
        // en español ("Norteamérica", "Sudamérica") y nunca coincidía con
        // "North America"/"South America", dejando NA y SA sin funcionar.
        const region = getRegion(country);
        return (region === "NA" || region === "SA" || region === "EMEA" || region === "ASIA") ? region : "OTHER";
    }

    function zcfPlayerMatchesQuery(p, nq) {
        if (!nq) return true;
        if (zcfNormalize(p.name).indexOf(nq) !== -1) return true;
        if (zcfNormalize(p.key).indexOf(nq) !== -1) return true;
        if (p.alternateIds && p.alternateIds.some(a => zcfNormalize(a).indexOf(nq) !== -1)) return true;
        const countryName = (typeof FLAGS !== "undefined" && FLAGS[p.country] && FLAGS[p.country].name) || "";
        if (countryName && zcfNormalize(countryName).indexOf(nq) !== -1) return true;
        if (p.country && zcfNormalize(p.country).indexOf(nq) !== -1) return true;
        return false;
    }

    function zcfIsFilterActive() {
        return zcfSearchQuery.trim().length > 0 || zcfSelectedRegions.size > 0 || zcfSelectedCountries.size > 0 || zcfSelectedActivity.size > 0 || zcfSelectedMovement.size > 0 || zcfSelectedAchievements.size > 0;
    }

    function zcfIsCategoryFilterActive() {
        return zcfSelectedRegions.size > 0 || zcfSelectedCountries.size > 0 || zcfSelectedActivity.size > 0 || zcfSelectedMovement.size > 0 || zcfSelectedAchievements.size > 0;
    }

    function zcfPlayerAchievementTypes(p) {
        const types = new Set();
        (p.achievements || []).forEach(a => {
            if (a.tier === "Campeón" || a.tier === "1er Lugar") types.add("champion");
            else if (a.tier === "Subcampeón" || a.tier === "2do Lugar") types.add("runner-up");
            else if (a.tier === "3er-4to Lugar" || a.tier === "3er Lugar" || a.tier === "4to Lugar") types.add("3rd-4th");
        });
        return types;
    }

    function zcfGetFilteredEntries() {
        const nq = zcfNormalize(zcfSearchQuery.trim());
        const entries = [];
        PLAYERS.forEach((p, i) => {
            const matchQuery = zcfPlayerMatchesQuery(p, nq);
            const matchRegion = zcfSelectedRegions.size === 0 || zcfSelectedRegions.has(zcfGetRegionCode(p.country));
            const matchCountry = zcfSelectedCountries.size === 0 || zcfSelectedCountries.has(p.country);
            const matchActivity = zcfSelectedActivity.size === 0 || zcfSelectedActivity.has(p.status);
            let matchMovement = true;
            if (zcfSelectedMovement.size > 0) {
                const change = getRankChange(p.key, i + 1);
                matchMovement = zcfSelectedMovement.has(change.type);
            }
            let matchAchievement = true;
            if (zcfSelectedAchievements.size > 0) {
                const types = zcfPlayerAchievementTypes(p);
                matchAchievement = Array.from(zcfSelectedAchievements).some(t => types.has(t));
            }
            if (matchQuery && matchRegion && matchCountry && matchActivity && matchMovement && matchAchievement) entries.push({ p, i, subPos: entries.length + 1 });
        });
        return entries;
    }

    function zcfEsc(str) {
        return (str || "").toString().replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    }

    function zcfGetSuggestions(rawQuery, limit) {
        limit = limit || 8;
        const trimmed = rawQuery.trim();
        const nq = zcfNormalize(trimmed);
        if (!nq) return [];
        const seen = new Set();
        const results = [];
        for (const p of PLAYERS) {
            if (seen.has(p.key)) continue;
            const nameNorm = zcfNormalize(p.name);
            const idx = nameNorm.indexOf(nq);
            if (idx !== -1) {
                results.push({ player: p, highlightStart: idx, highlightLen: trimmed.length, matchedId: null });
                seen.add(p.key);
            } else {
                let matchedId = null;
                let idIdx = -1;
                for (const a of (p.alternateIds || [])) {
                    const aIdx = zcfNormalize(a).indexOf(nq);
                    if (aIdx !== -1) { matchedId = a; idIdx = aIdx; break; }
                }
                if (matchedId === null) {
                    const keyIdx = zcfNormalize(p.key).indexOf(nq);
                    if (keyIdx !== -1) { matchedId = p.key; idIdx = keyIdx; }
                }
                let matchedCountry = null;
                if (matchedId === null) {
                    const countryName = (typeof FLAGS !== "undefined" && FLAGS[p.country] && FLAGS[p.country].name) || "";
                    if (countryName && zcfNormalize(countryName).indexOf(nq) !== -1) matchedCountry = countryName;
                }
                if (matchedId !== null || matchedCountry !== null) {
                    results.push({ player: p, highlightStart: -1, highlightLen: 0, matchedId, idHighlightStart: idIdx, idHighlightLen: trimmed.length, matchedCountry });
                    seen.add(p.key);
                }
            }
            if (results.length >= limit) break;
        }
        return results;
    }

    function zcfRenderSuggestions() {
        const box = document.getElementById("zcfSuggestions");
        const input = document.getElementById("zcfSearchInput");
        if (!box || !input) return;
        const trimmed = input.value.trim();
        if (!trimmed) {
            box.innerHTML = "";
            box.style.display = "none";
            return;
        }
        const sugg = zcfGetSuggestions(trimmed, 8);
        if (sugg.length === 0) {
            box.innerHTML = `<div class="zcf-suggestion-empty">No se encontró ningún jugador.</div>`;
            box.style.display = "block";
            return;
        }
        box.innerHTML = sugg.map(s => {
            let label;
            if (s.highlightStart >= 0) {
                const name = s.player.name;
                const before = zcfEsc(name.slice(0, s.highlightStart));
                const match = zcfEsc(name.slice(s.highlightStart, s.highlightStart + s.highlightLen));
                const after = zcfEsc(name.slice(s.highlightStart + s.highlightLen));
                label = `${before}<b>${match}</b>${after}`;
            } else {
                label = zcfEsc(s.player.name);
            }
            let idsHtml = "";
            if (s.player.alternateIds && s.player.alternateIds.length) {
                const idsInner = s.player.alternateIds.map(id => {
                    if (s.matchedId && id === s.matchedId) {
                        const ibefore = zcfEsc(id.slice(0, s.idHighlightStart));
                        const imatch = zcfEsc(id.slice(s.idHighlightStart, s.idHighlightStart + s.idHighlightLen));
                        const iafter = zcfEsc(id.slice(s.idHighlightStart + s.idHighlightLen));
                        return `${ibefore}<b>${imatch}</b>${iafter}`;
                    }
                    return zcfEsc(id);
                }).join(", ");
                idsHtml = `<span class="zcf-suggestion-id">${idsInner}</span>`;
            }
            let countryHtml = "";
            if (s.matchedCountry) {
                countryHtml = `<span class="zcf-suggestion-id">${zcfEsc(s.matchedCountry)}</span>`;
            }
            return `<button type="button" class="zcf-suggestion-item" data-suggest-name="${zcfEsc(s.player.name)}">${label}${idsHtml}${countryHtml}</button>`;
        }).join("");
        box.style.display = "block";
        box.querySelectorAll("[data-suggest-name]").forEach(btn => {
            btn.addEventListener("click", () => {
                zcPlaySound("click");
                input.value = btn.getAttribute("data-suggest-name");
                zcfSearchQuery = input.value;
                box.innerHTML = "";
                box.style.display = "none";
                renderRanking();
                zcfCloseMenu();
            });
        });
    }

    function zcfOpenMenu() {
        zcPlaySound("entrar");
        // Cierra cualquier otro modal/menú abierto para no pisar el bloqueo de scroll de la página
        if (typeof closeAllModals === "function") closeAllModals();
        const menuEl = document.getElementById("mobileMenu");
        if (menuEl && menuEl.classList.contains("open") && typeof closeMenu === "function") closeMenu();
        const overlay = document.getElementById("zcfOverlay");
        if (!overlay) return;
        // La hoja de filtros ahora sube desde abajo de la página como overlay
        // en cualquier tamaño de pantalla (igual que el menú de 3 rayas),
        // así que siempre bloqueamos el scroll del fondo mientras está abierta.
        lockBodyScroll();
        overlay.classList.add("open");
        const input = document.getElementById("zcfSearchInput");
        if (input) input.focus({ preventScroll: true });
    }
    function zcfCloseMenu() {
        const overlay = document.getElementById("zcfOverlay");
        if (!overlay) return;
        zcPlaySound("salir");
        overlay.classList.remove("open");
        unlockBodyScroll();
        const box = document.getElementById("zcfSuggestions");
        if (box) { box.innerHTML = ""; box.style.display = "none"; }
    }

    function zcfInit() {
        const openBtn = document.getElementById("zcfOpenBtn");
        const closeBtn = document.getElementById("zcfCloseBtn");
        const overlay = document.getElementById("zcfOverlay");
        const resetBtn = document.getElementById("zcfResetBtn");
        const input = document.getElementById("zcfSearchInput");
        const searchWrap = document.getElementById("zcfSearchWrap");

        if (openBtn) openBtn.addEventListener("click", zcfOpenMenu);
        if (closeBtn) closeBtn.addEventListener("click", zcfCloseMenu);
        if (overlay) {
            overlay.addEventListener("click", (e) => {
                if (e.target === overlay) zcfCloseMenu();
            });
        }
        if (input) {
            let zcfRenderDebounce = null;
            input.addEventListener("input", () => {
                zcfSearchQuery = input.value;
                zcfRenderSuggestions();
                clearTimeout(zcfRenderDebounce);
                zcfRenderDebounce = setTimeout(renderRanking, 120);
            });
            input.addEventListener("focus", () => {
                if (input.value.trim()) zcfRenderSuggestions();
            });
            input.addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    zcfSearchQuery = input.value;
                    renderRanking();
                    zcfCloseMenu();
                }
            });
        }
        document.addEventListener("click", (e) => {
            if (searchWrap && !searchWrap.contains(e.target)) {
                const box = document.getElementById("zcfSuggestions");
                if (box) box.style.display = "none";
            }
        });
        document.querySelectorAll("#zcfRegionGroup .zcf-checkbox-item").forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                zcPlaySound("click");
                const region = item.getAttribute("data-region");
                item.classList.toggle("checked");
                if (item.classList.contains("checked")) zcfSelectedRegions.add(region);
                else zcfSelectedRegions.delete(region);
                renderRanking();
            });
        });
        document.querySelectorAll("#zcfActivityGroup .zcf-checkbox-item").forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                zcPlaySound("click");
                const activity = item.getAttribute("data-activity");
                item.classList.toggle("checked");
                if (item.classList.contains("checked")) zcfSelectedActivity.add(activity);
                else zcfSelectedActivity.delete(activity);
                renderRanking();
            });
        });
        document.querySelectorAll("#zcfMovementGroup .zcf-checkbox-item").forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                zcPlaySound("click");
                const movement = item.getAttribute("data-movement");
                item.classList.toggle("checked");
                if (item.classList.contains("checked")) zcfSelectedMovement.add(movement);
                else zcfSelectedMovement.delete(movement);
                renderRanking();
            });
        });
        document.querySelectorAll("#zcfAchievementGroup .zcf-checkbox-item").forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                zcPlaySound("click");
                const ach = item.getAttribute("data-achievement");
                item.classList.toggle("checked");
                if (item.classList.contains("checked")) zcfSelectedAchievements.add(ach);
                else zcfSelectedAchievements.delete(ach);
                renderRanking();
            });
        });
        zcfRenderCountryList();
        document.querySelectorAll("#zcfOrderGroup .zcf-checkbox-item").forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                zcPlaySound("click");
                const order = item.getAttribute("data-order");
                const isChecked = item.classList.contains("checked");
                if (isChecked) {
                    item.classList.remove("checked");
                    zcfSortOrder = "desc";
                } else {
                    document.querySelectorAll("#zcfOrderGroup .zcf-checkbox-item").forEach(el => el.classList.remove("checked"));
                    item.classList.add("checked");
                    zcfSortOrder = order;
                }
                renderRanking();
            });
        });
        if (resetBtn) {
            resetBtn.addEventListener("click", () => {
                zcPlaySound("click");
                zcfSearchQuery = "";
                zcfSelectedRegions.clear();
                zcfSelectedCountries.clear();
                zcfSelectedActivity.clear();
                zcfSelectedMovement.clear();
                zcfSelectedAchievements.clear();
                zcfSortOrder = "desc";
                if (input) input.value = "";
                document.querySelectorAll("#zcfRegionGroup .zcf-checkbox-item.checked").forEach(item => item.classList.remove("checked"));
                document.querySelectorAll("#zcfCountryScroll .zcf-country-item.checked").forEach(item => item.classList.remove("checked"));
                document.querySelectorAll("#zcfOrderGroup .zcf-checkbox-item").forEach(item => item.classList.remove("checked"));
                document.querySelectorAll("#zcfActivityGroup .zcf-checkbox-item.checked").forEach(item => item.classList.remove("checked"));
                document.querySelectorAll("#zcfMovementGroup .zcf-checkbox-item.checked").forEach(item => item.classList.remove("checked"));
                document.querySelectorAll("#zcfAchievementGroup .zcf-checkbox-item.checked").forEach(item => item.classList.remove("checked"));
                const box = document.getElementById("zcfSuggestions");
                if (box) { box.innerHTML = ""; box.style.display = "none"; }
                renderRanking();
            });
        }
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && overlay && overlay.classList.contains("open")) zcfCloseMenu();
        });
    }

    /* ===================================================================
       ZC26 · Lista de países del menú de filtros (prefijo "zcf")
       Una fila por país, scroll vertical de ~3 filas con barra invisible;
       funciona con rueda (nativo), arrastre de cursor en PC y táctil.
    =================================================================== */
    function zcfGetAvailableCountries() {
        const seen = new Set();
        const list = [];
        PLAYERS.forEach(p => {
            if (!seen.has(p.country) && FLAGS[p.country]) {
                seen.add(p.country);
                list.push(p.country);
            }
        });
        list.sort((a, b) => (FLAGS[a].name || a).localeCompare(FLAGS[b].name || b, "es"));
        return list;
    }

    function zcfRenderCountryList() {
        const wrap = document.getElementById("zcfCountryScroll");
        if (!wrap) return;
        const countries = zcfGetAvailableCountries();
        wrap.innerHTML = countries.map(code => `
            <label class="zcf-country-item" data-country="${code}"><span class="zcf-checkbox-box"></span>${zcfEsc(FLAGS[code].name)}</label>
        `).join("");
        wrap.querySelectorAll(".zcf-country-item").forEach(item => {
            item.addEventListener("click", (e) => {
                e.preventDefault();
                zcPlaySound("click");
                const code = item.getAttribute("data-country");
                item.classList.toggle("checked");
                if (item.classList.contains("checked")) zcfSelectedCountries.add(code);
                else zcfSelectedCountries.delete(code);
                renderRanking();
            });
        });
        zcsInitVDrag(wrap);
    }

    function zcsInitVDrag(el) {
        if (!el || el.dataset.zcsVBound === "1") return;
        el.dataset.zcsVBound = "1";
        let dragging = false, startY = 0, startScroll = 0;
        el.addEventListener("pointerdown", (e) => {
            if (e.pointerType !== "mouse") return;
            dragging = true;
            el.classList.add("zc-dragging");
            startY = e.clientY;
            startScroll = el.scrollTop;
            el.setPointerCapture(e.pointerId);
        });
        el.addEventListener("pointermove", (e) => {
            if (!dragging) return;
            el.scrollTop = startScroll - (e.clientY - startY);
        });
        function endDrag() {
            dragging = false;
            el.classList.remove("zc-dragging");
        }
        el.addEventListener("pointerup", endDrag);
        el.addEventListener("pointerleave", endDrag);
    }

    let rankingExpanded = false;
    const RANKING_TOP_COUNT = 10;

    function zcfUpdateFilterCount() {
        const badge = document.getElementById("zcfFilterCount");
        if (!badge) return;
        const count = zcfSelectedRegions.size + zcfSelectedCountries.size + zcfSelectedActivity.size
            + zcfSelectedMovement.size + zcfSelectedAchievements.size + (zcfSearchQuery.trim() ? 1 : 0);
        if (count > 0) {
            badge.textContent = count;
            badge.style.display = "inline-flex";
        } else {
            badge.style.display = "none";
        }
    }

    function renderRanking() {
        zcfUpdateFilterCount();
        const list = document.getElementById("rankingList");
        const rankToggleWrap = document.querySelector("#ranking .rank-toggle-wrap");
        const zcfActive = typeof zcfIsFilterActive === "function" && zcfIsFilterActive();
        const showSubPos = typeof zcfIsCategoryFilterActive === "function" && zcfIsCategoryFilterActive();
        let entries;
        if (zcfActive) {
            entries = zcfGetFilteredEntries(); // [{ p, i, subPos }] usando el índice real dentro de PLAYERS
            if (rankToggleWrap) rankToggleWrap.style.display = "none";
            if (entries.length === 0) {
                list.innerHTML = `<div class="zcf-empty-ranking">No se encontró ningún jugador con estos filtros.</div>`;
                return;
            }
        } else {
            if (rankToggleWrap) rankToggleWrap.style.display = "";
            const visiblePlayers = rankingExpanded ? PLAYERS : PLAYERS.slice(0, RANKING_TOP_COUNT);
            entries = visiblePlayers.map((p, i) => ({ p, i }));
        }
        if (zcfSelectedMovement.size > 0) {
            entries = entries.slice().sort((a, b) => {
                const ca = getRankChange(a.p.key, a.i + 1);
                const cb = getRankChange(b.p.key, b.i + 1);
                const va = ca.value || 0, vb = cb.value || 0;
                return (typeof zcfSortOrder !== "undefined" && zcfSortOrder === "asc") ? va - vb : vb - va;
            });
        } else if (typeof zcfSortOrder !== "undefined" && zcfSortOrder === "asc") {
            entries = entries.slice().reverse();
        }
        list.innerHTML = entries.map(({ p, i, subPos }) => {
            const pos = i + 1; // posición derivada del orden del array: nunca se repite/empata
            const medal = pos === 1 ? "gold" : pos === 2 ? "silver" : pos === 3 ? "bronze" : "";
            const rowTier = pos === 1 ? "tier-gold" : pos === 2 ? "tier-silver" : pos === 3 ? "tier-bronze" : (pos >= 4 && pos <= 7) ? "tier-gray" : "";
            const subPosHtml = (showSubPos && subPos) ? `<span class="zcf-subpos">(${subPos})</span>` : "";
            const change = getRankChange(p.key, pos);
            const h = computeHighlights(pos, PLAYERS.length);
            const realRise = change.type === "up" ? `+${change.value}` : "—";
            const realFall = change.type === "down" ? `−${change.value}` : "—";
            const tier = getRankTier(pos);
            const region = getRegion(p.country);
            const wedgeClass = medal ? `wedge-${medal}` : "wedge-default";
            const iconHtml = ""; // playerIconHtml(p.key); — desactivado temporalmente para ver cómo luce sin íconos
            return `
            <div class="rank-item" data-index="${i}">
                <div class="rank-row rank-row2 ${rowTier}" data-toggle="${i}" tabindex="0" role="button" aria-expanded="false">
                    <div class="rank-wedge ${wedgeClass}">
                        <span class="rank-pos2 ${medal}">${pos}<span class="rank-pos2-dot">.</span></span>${subPosHtml}
                    </div>
                    ${iconHtml}
                    <span class="rank-flag2">${flagImg(p.country, true)}</span>
                    <div class="rank-row2-info">
                        <div class="rank-row2-top">
                            <button class="rank-name2 ${medal}" data-open="${i}">${p.name}</button>
                        </div>
                        <div class="rank-row2-bottom">
                            <img class="rank-tier-icon rank-tier-icon-${tier.kind}" src="assets/ranks/${tier.icon}" alt="${tier.label}" onerror="this.style.display='none'">
                            <span class="rank-tier-name">${tier.label}</span>
                            <span class="rank-row2-points">${zcFormatPoints(p.points)} pts</span>
                        </div>
                    </div>
                    <div class="rank-region region-${region.toLowerCase()}">${getRegionLabel(region)}</div>
                </div>
                <div class="rank-detail">
                    <div class="rank-detail-inner">
                        <div class="rank-detail-field">Eventos: <b>${p.events}</b></div>
                        <div class="rank-detail-field">Títulos: <b>${p.titles || "—"}</b></div>
                        <div class="rank-detail-field">Sets (G-P): <b>${p.sets}</b></div>
                        <div class="rank-detail-field">Partidas (PG-PP): <b>${p.matches}</b></div>
                        <div class="rank-detail-divider"></div>
                        <div class="rank-detail-title full">Datos destacados</div>
                        <div class="rank-highlight-grid full">
                            <div class="rank-highlight-item"><span class="rank-highlight-value ${medal}">${h.current}º</span><span class="rank-highlight-label">Clasificación actual</span></div>
                            <div class="rank-highlight-item"><span class="rank-highlight-value">${h.best}º</span><span class="rank-highlight-label">Mejor Clasificación</span></div>
                            <div class="rank-highlight-item"><span class="rank-highlight-value">${h.worst}º</span><span class="rank-highlight-label">Peor clasificación</span></div>
                            <div class="rank-highlight-item"><span class="rank-highlight-value">${h.avg}º</span><span class="rank-highlight-label">Posición promedio</span></div>
                            <div class="rank-highlight-item"><span class="rank-highlight-value rise">${realRise}</span><span class="rank-highlight-label">Mayor subida</span></div>
                            <div class="rank-highlight-item"><span class="rank-highlight-value fall">${realFall}</span><span class="rank-highlight-label">Mayor bajada</span></div>
                        </div>
                        <div class="rank-detail-divider"></div>
                        <div class="rank-detail-field full">Puntos totales: <b>${zcFormatPoints(p.points)} pts</b></div>
                    </div>
                </div>
            </div>
        `;
        }).join("");
        list.querySelectorAll("[data-toggle]").forEach(row => {
            const toggle = () => {
                const item = row.closest(".rank-item");
                const open = item.classList.toggle("open");
                zcPlaySound(open ? "clickentrar" : "clicksalir");
                row.setAttribute("aria-expanded", open ? "true" : "false");
            };
            row.addEventListener("click", toggle);
            row.addEventListener("keydown", e => {
                if (e.target === row && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); toggle(); }
            });
        });
        list.querySelectorAll("[data-open]").forEach(nameBtn => {
            nameBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                openPlayerModal(PLAYERS[nameBtn.dataset.open]);
            });
        });

    }

    /* ===================================================================
       ZC26 · Última Clasificación (bloque independiente, prefijo "zclc")
       Calcula datos destacados a partir de PLAYERS / getRankChange ya
       existentes, sin modificar su lógica.
    =================================================================== */
    function zclcComputeHighlights() {
        const best = { player: PLAYERS[0], pos: 1 };

        let maxUp = null, maxDown = null;
        PLAYERS.forEach((p, i) => {
            const pos = i + 1;
            const change = getRankChange(p.key, pos);
            if (change.type === "up") {
                if (!maxUp || change.value > maxUp.value) maxUp = { player: p, value: change.value };
            } else if (change.type === "down") {
                if (!maxDown || change.value > maxDown.value) maxDown = { player: p, value: change.value };
            }
        });

        let maxGain = null, maxLoss = null;
        PLAYERS.forEach((p, i) => {
            const pos = i + 1;
            const seed = (pos * 17) % 23;
            const delta = +(((seed - 11) / 11) * 90).toFixed(2);
            if (!maxGain || delta > maxGain.value) maxGain = { player: p, value: delta };
            if (!maxLoss || delta < maxLoss.value) maxLoss = { player: p, value: delta };
        });

        let newHighest = null;
        PLAYERS.forEach((p, i) => {
            const pos = i + 1;
            if (RANK_NEW_PLAYERS.has(p.key)) {
                if (!newHighest || pos < newHighest.pos) newHighest = { player: p, pos };
            }
        });
        if (!newHighest) newHighest = { player: PLAYERS[Math.min(5, PLAYERS.length - 1)], pos: Math.min(6, PLAYERS.length) };

        return [
            { label: "Mejor clasificación", player: best.player, valueHtml: `${best.pos}º` },
            { label: "Mayor subida", player: (maxUp || best).player, valueHtml: maxUp ? `${maxUp.value}` : "—" },
            { label: "Más puntos conseguidos", player: maxGain.player, valueHtml: zcFormatPoints(maxGain.value, { showPlus: true }) },
            { label: "Nueva clasificación más alta", player: newHighest.player, valueHtml: `${newHighest.pos}º` },
            { label: "Mayor descenso", player: (maxDown || best).player, valueHtml: maxDown ? `${maxDown.value}` : "—" },
            { label: "Más puntos perdidos", player: maxLoss.player, valueHtml: zcFormatPoints(maxLoss.value, { showPlus: true }) }
        ];
    }

    function renderLastClassification() {
        const scroll = document.getElementById("zclcScroll");
        if (!scroll) return;
        const items = zclcComputeHighlights();
        scroll.innerHTML = items.map((it, idx) => `
            <div class="zclc-card">
                <span class="zclc-card-flag">${flagImg(it.player.country, true)}</span>
                <button type="button" class="zclc-card-name" data-zclc-open="${idx}">${it.player.name}</button>
                <span class="zclc-card-label">${it.label}</span>
                <span class="zclc-card-value">${it.valueHtml}</span>
            </div>
        `).join("");
        scroll.querySelectorAll("[data-zclc-open]").forEach(btn => {
            btn.addEventListener("click", () => {
                const idx = Number(btn.dataset.zclcOpen);
                openPlayerModal(items[idx].player);
            });
        });
        zcsInitHBar(scroll, document.getElementById("zclcTrack"), document.getElementById("zclcThumb"));
    }

    /* ===================================================================
       ZC26 · Barra de scroll con pista visual y auto-desvanecido
       (bloque independiente, reutilizable, prefijo genérico "zcs")
       - Aparece brevemente al mostrarse (hint) y se oculta sola.
       - Al usarla (scroll/drag/rueda) reaparece y se oculta más rápido
         al dejar de usarla.
       - Soporta rueda del mouse y arrastre con cursor en PC; el táctil
         usa el scroll nativo del navegador.
    =================================================================== */
    function zcsInitHBar(scrollEl, trackEl, thumbEl) {
        if (!scrollEl || !trackEl || !thumbEl || scrollEl.dataset.zcsBound === "1") return;
        scrollEl.dataset.zcsBound = "1";
        let hideTimer = null;

        function updateThumb() {
            const scrollWidth = scrollEl.scrollWidth;
            const clientWidth = scrollEl.clientWidth;
            if (scrollWidth <= clientWidth + 2) {
                trackEl.style.display = "none";
                return;
            }
            trackEl.style.display = "";
            const trackWidth = trackEl.clientWidth;
            const thumbWidth = Math.max(24, (clientWidth / scrollWidth) * trackWidth);
            thumbEl.style.width = thumbWidth + "px";
            const maxThumbLeft = Math.max(0, trackWidth - thumbWidth);
            const maxScrollLeft = Math.max(1, scrollWidth - clientWidth);
            const ratio = scrollEl.scrollLeft / maxScrollLeft;
            thumbEl.style.transform = `translateX(${ratio * maxThumbLeft}px)`;
        }

        function showBar(fast) {
            trackEl.classList.add("zc-visible");
            clearTimeout(hideTimer);
            hideTimer = setTimeout(() => {
                trackEl.classList.remove("zc-visible");
            }, fast ? 550 : 2200);
        }

        updateThumb();
        requestAnimationFrame(() => showBar(false)); // hint inicial: se ve una vez y desaparece sola

        scrollEl.addEventListener("scroll", () => {
            updateThumb();
            showBar(true); // al usarla desaparece más rápido al dejar de usarla
        }, { passive: true });

        scrollEl.addEventListener("wheel", (e) => {
            if (scrollEl.scrollWidth <= scrollEl.clientWidth) return;
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
                scrollEl.scrollLeft += e.deltaY;
                e.preventDefault();
            }
        }, { passive: false });

        let dragging = false, dragStartX = 0, dragStartScroll = 0;
        scrollEl.addEventListener("pointerdown", (e) => {
            if (e.pointerType !== "mouse") return;
            dragging = true;
            scrollEl.classList.add("zc-dragging");
            dragStartX = e.clientX;
            dragStartScroll = scrollEl.scrollLeft;
            scrollEl.setPointerCapture(e.pointerId);
        });
        scrollEl.addEventListener("pointermove", (e) => {
            if (!dragging) return;
            scrollEl.scrollLeft = dragStartScroll - (e.clientX - dragStartX);
        });
        function endDrag() {
            dragging = false;
            scrollEl.classList.remove("zc-dragging");
        }
        scrollEl.addEventListener("pointerup", endDrag);
        scrollEl.addEventListener("pointerleave", endDrag);
        window.addEventListener("resize", updateThumb);
    }

    function renderTrophies() {
        const grid = document.getElementById("trophyGrid");
        grid.innerHTML = TROPHIES.map((t, i) => `
            <div class="trophy-item" data-index="${i}" tabindex="0" role="button">
                <div class="trophy-logo"><img src="${t.logo}" alt="${t.team}"></div>
                <div class="trophy-label">${t.team}</div>
                <div class="trophy-date">${t.champDate.replace('Campeón ', '')}</div>
            </div>
        `).join("");
        grid.querySelectorAll(".trophy-item").forEach(item => {
            item.addEventListener("click", () => openTrophyModal(TROPHIES[item.dataset.index]));
            item.addEventListener("keydown", e => {
                if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openTrophyModal(TROPHIES[item.dataset.index]); }
            });
        });
    }

    function scorePairHtml(scoreA, scoreB, flat) {
        if (flat) {
            return `<span class="score-pair"><span class="score-flat">${scoreA}</span><span class="score-sep">:</span><span class="score-flat">${scoreB}</span></span>`;
        }
        const aClass = scoreA < scoreB ? "score-low" : "score-high";
        const bClass = scoreB < scoreA ? "score-low" : "score-high";
        return `<span class="score-pair"><span class="${aClass}">${scoreA}</span><span class="score-sep">:</span><span class="${bClass}">${scoreB}</span></span>`;
    }

    function normId(s) {
        return (s || "").toString()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
            .toLowerCase().replace(/[^a-z0-9]/g, "");
    }

    function matchResultClass(p, m) {
        const tokens = [p.name, ...(p.alternateIds || [])];
        if (p.teamTag) tokens.push(p.teamTag);
        const normTokens = tokens.map(normId).filter(Boolean);
        function sideMatches(sideName) {
            const ns = normId(sideName);
            if (!ns) return false;
            return normTokens.some(t => ns.includes(t) || t.includes(ns));
        }
        let side = null;
        if (sideMatches(m.teamA)) side = "A";
        else if (sideMatches(m.teamB)) side = "B";
        if (!side) return "";
        const won = side === "A" ? m.scoreA > m.scoreB : m.scoreB > m.scoreA;
        return won ? "match-win" : "match-loss";
    }

    function renderCarousel(items, itemHtmlFn, emptyHtml, opts) {
        opts = opts || {};
        if (!items.length) return opts.externalCounter ? { trackHtml: emptyHtml, counterHtml: "" } : emptyHtml;
        const count = items.length;
        const slideWidth = 100 / count;
        const slides = items.map((it, i) => `<div class="carousel-slide" data-slide="${i}" style="width:${slideWidth}%">${itemHtmlFn(it)}</div>`).join("");
        let nav = "";
        if (count > 1 && !opts.externalCounter && !opts.hideNav) {
            nav = `<div class="carousel-nav">
                <button type="button" class="carousel-arrow carousel-prev" aria-label="Anterior">‹</button>
                <span class="carousel-counter"><span class="carousel-counter-current">1</span>/${count}</span>
                <button type="button" class="carousel-arrow carousel-next" aria-label="Siguiente">›</button>
            </div>`;
        }
        const trackHtml = `<div class="carousel ${opts.swipeOnly ? "carousel-swipe" : ""}" data-current="0" data-total="${count}">
            <div class="carousel-track" style="width:${count * 100}%">${slides}</div>
            ${nav}
        </div>`;
        if (opts.externalCounter) {
            const counterHtml = count > 1 ? `<span class="recent-counter"><span class="carousel-counter-current">1</span>/${count}</span>` : "";
            return { trackHtml, counterHtml };
        }
        return trackHtml;
    }

    function initCarousels(root) {
        root.querySelectorAll(".carousel").forEach(car => {
            const total = parseInt(car.dataset.total, 10);
            let current = parseInt(car.dataset.current, 10);
            const track = car.querySelector(".carousel-track");
            const slides = Array.from(car.querySelectorAll(".carousel-slide"));
            const counter = car.querySelector(".carousel-counter-current")
                || (car.previousElementSibling && car.previousElementSibling.querySelector(".carousel-counter-current"));
            function applyHeight() {
                const activeSlide = slides[current];
                if (activeSlide) car.style.height = activeSlide.scrollHeight + "px";
            }
            function show(idx) {
                current = (idx + total) % total;
                if (track) track.style.transform = `translateX(-${current * (100 / total)}%)`;
                if (counter) counter.textContent = current + 1;
                car.dataset.current = current;
                applyHeight();
            }
            applyHeight();
            const prevBtn = car.querySelector(".carousel-prev");
            const nextBtn = car.querySelector(".carousel-next");
            if (prevBtn) prevBtn.addEventListener("click", (e) => { e.stopPropagation(); zcPlaySound("click"); show(current - 1); });
            if (nextBtn) nextBtn.addEventListener("click", (e) => { e.stopPropagation(); zcPlaySound("click"); show(current + 1); });

            if (total > 1 && track) {
                let startX = null, startY = null, dragging = false, baseOffset = 0;
                track.addEventListener("pointerdown", (e) => {
                    dragging = true;
                    startX = e.clientX;
                    startY = e.clientY;
                    baseOffset = -current * (100 / total);
                    track.style.transition = "none";
                    try { track.setPointerCapture(e.pointerId); } catch (err) {}
                });
                track.addEventListener("pointermove", (e) => {
                    if (!dragging) return;
                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;
                    if (Math.abs(dy) > Math.abs(dx)) return;
                    const widthPx = car.getBoundingClientRect().width || 1;
                    const dragPct = (dx / widthPx) * (100 / total);
                    track.style.transform = `translateX(${baseOffset + dragPct}%)`;
                });
                track.addEventListener("pointerup", (e) => {
                    if (!dragging) return;
                    dragging = false;
                    track.style.transition = "";
                    const dx = e.clientX - startX;
                    const dy = e.clientY - startY;
                    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
                        if (dx < 0) show(current + 1); else show(current - 1);
                    } else {
                        show(current);
                    }
                });
                track.addEventListener("pointercancel", () => { dragging = false; track.style.transition = ""; show(current); });
            }
        });
    }

    function initRadarTooltips(root) {
        root.querySelectorAll(".stat-radar-wrap").forEach(wrap => {
            const svg = wrap.querySelector(".stat-radar-svg");
            if (!svg) return;
            let tooltipEl = wrap.querySelector(".radar-tooltip");
            if (!tooltipEl) {
                tooltipEl = document.createElement("div");
                tooltipEl.className = "radar-tooltip";
                wrap.appendChild(tooltipEl);
            }
            function hideTooltip() { tooltipEl.style.display = "none"; delete tooltipEl.dataset.idx; }
            function positionTooltip(hit) {
                const wrapRect = wrap.getBoundingClientRect();
                const hitRect = hit.getBoundingClientRect();
                const x = hitRect.left + hitRect.width / 2 - wrapRect.left;
                const yTop = hitRect.top - wrapRect.top;
                const yBottom = hitRect.bottom - wrapRect.top;
                requestAnimationFrame(() => {
                    const ttRect = tooltipEl.getBoundingClientRect();
                    const halfW = ttRect.width / 2;
                    const clampedX = Math.max(halfW + 4, Math.min(wrapRect.width - halfW - 4, x));
                    tooltipEl.style.left = clampedX + "px";
                    if (yTop - ttRect.height - 10 < 0) {
                        tooltipEl.style.transform = "translate(-50%, 10px)";
                        tooltipEl.style.top = yBottom + "px";
                    } else {
                        tooltipEl.style.transform = "translate(-50%, calc(-100% - 10px))";
                        tooltipEl.style.top = yTop + "px";
                    }
                });
            }
            svg.querySelectorAll(".radar-label-hit").forEach(hit => {
                hit.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const idx = hit.dataset.idx;
                    const item = RADAR_ITEMS[parseInt(idx, 10)];
                    if (!item) return;
                    if (tooltipEl.dataset.idx === idx && tooltipEl.style.display === "block") {
                        hideTooltip();
                        return;
                    }
                    zcPlaySound("click");
                    tooltipEl.dataset.idx = idx;
                    tooltipEl.innerHTML = `<div class="radar-tooltip-title">${item.full}</div><div>${item.desc}</div>`;
                    tooltipEl.style.display = "block";
                    positionTooltip(hit);
                });
            });
            if (!wrap.dataset.tooltipOutsideBound) {
                wrap.dataset.tooltipOutsideBound = "1";
                document.addEventListener("click", hideTooltip);
            }
        });
    }

    function achPlaceLabel(a) {
        if (a.tier === "Campeón") return "1st Champion";
        if (a.tier === "Subcampeón") return "2nd Runner-Up";
        if (a.tier === "3er-4to Lugar") return "3rd-4th place";
        if (a.tier === "1er Lugar") return "1st";
        if (a.tier === "2do Lugar") return "2nd";
        if (a.tier === "3er Lugar") return "3rd-4th place";
        if (a.tier === "4to Lugar") return "3rd-4th place";
        return a.place;
    }

    function achTierClass(a) {
        if (a.tier === "Campeón" || a.tier === "1er Lugar") return "gold";
        if (a.tier === "Subcampeón" || a.tier === "2do Lugar") return "silver";
        if (a.tier === "3er-4to Lugar" || a.tier === "3er Lugar" || a.tier === "4to Lugar") return "purple";
        return "";
    }

    function posTierClass(pos) {
        if (pos <= 3) return "tier-top";
        if (pos <= 7) return "tier-mid";
        return "tier-low";
    }

    const MEDAL_IMAGES = {
        gold: "top1picture.png",
        silver: "top2picture.png",
        bronze: "top3picture.png"
    };

    const RANK_TIER_IMAGES = {
        "Bronce": "Bronze.png",
        "Plata": "Silver.png",
        "Oro": "Gold.png",
        "Diamante": "Diamond.png",
        "Mítico": "Mythic.png",
        "Legendario": "Legendary.png",
        "Master": "Masters.png",
        "Pro": "Pro.png"
    };

    function isChampion(p) {
        return p.titles === "Campeón" || (p.achievements || []).some(a => a.tier === "Campeón");
    }

    function parseRecord(str) {
        const m = String(str || "").match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);
        return m ? { w: +m[1], l: +m[2] } : null;
    }

    function computeWinRate(p) {
        const rec = parseRecord(p.sets);
        if (!rec || (rec.w + rec.l) === 0) return null;
        return Math.round((rec.w / (rec.w + rec.l)) * 100) + "%";
    }

    function extractEventsCount(str) {
        const m = String(str || "").match(/^\s*(\d+)/);
        return m ? +m[1] : null;
    }

    function computeAvgPoints(p) {
        const n = extractEventsCount(p.events);
        if (!n || n <= 0) return null;
        return (p.points / n).toFixed(1) + " pts";
    }

    function computeAvgPointsNum(p) {
        const n = extractEventsCount(p.events);
        if (!n || n <= 0) return null;
        return p.points / n;
    }

    function pctFromRecord(str) {
        const rec = parseRecord(str);
        if (!rec || (rec.w + rec.l) === 0) return null;
        return (rec.w / (rec.w + rec.l)) * 100;
    }

    let _maxAvgPointsCache = null;
    function maxAvgPoints() {
        if (_maxAvgPointsCache === null) {
            const vals = PLAYERS.map(computeAvgPointsNum).filter(v => v !== null && v > 0);
            _maxAvgPointsCache = vals.length ? Math.max(...vals) : 1;
        }
        return _maxAvgPointsCache;
    }

    let _maxPointsCache = null;
    function maxPoints() {
        if (_maxPointsCache === null) {
            const vals = PLAYERS.map(p => p.points || 0);
            _maxPointsCache = vals.length ? Math.max(...vals) : 1;
        }
        return _maxPointsCache;
    }

    function statBarClass(pct) {
        return pct >= 66 ? "good" : pct >= 33 ? "mid" : "bad";
    }

    function statBarHtml(pct) {
        if (pct === null || pct === undefined || isNaN(pct)) return "";
        const clamped = Math.max(0, Math.min(100, pct));
        return `<div class="stat-bar-track"><div class="stat-bar-fill ${statBarClass(clamped)}" style="width:${clamped}%"></div></div>`;
    }

    function seededValue(seedStr, min, max) {
        let h = 0;
        for (let i = 0; i < seedStr.length; i++) { h = (h * 31 + seedStr.charCodeAt(i)) >>> 0; }
        const frac = (h % 1000) / 1000;
        return Math.round(min + frac * (max - min));
    }

    function computeExtraStat(p, statKey) {
        return seededValue((p.key || p.name || "x") + "_" + statKey, 32, 96);
    }

    function computePotencial(p) {
        const pct = (p.points || 0) / (maxPoints() || 1);
        return Math.round(40 + pct * 59);
    }

    function computeHabilidades(p) {
        const winPct = pctFromRecord(p.sets);
        const matchesPct = pctFromRecord(p.matches);
        const vals = [winPct, matchesPct].filter(v => v !== null);
        if (!vals.length) return 50;
        return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
    }

    function countAchievementPlaces(p) {
        const ach = Array.isArray(p.achievements) ? p.achievements : [];
        let firsts = 0, seconds = 0, thirds = 0, fourths = 0;
        ach.forEach(a => {
            const place = String(a.place || "");
            if (place.startsWith("1")) firsts++;
            else if (place.startsWith("2")) seconds++;
            else if (place.startsWith("3")) thirds++;
            else if (place.startsWith("4")) fourths++;
        });
        return { firsts, seconds, thirds, fourths };
    }

    function computeReputacion(p) {
        // 1) Rendimiento acumulado: puntos totales frente al máximo del ranking.
        const ptsScore = Math.min(100, ((p.points || 0) / (maxPoints() || 1)) * 100);

        // 2) Logros: los títulos ganados son lo que más pesa en el prestigio internacional.
        const { firsts, seconds, thirds, fourths } = countAchievementPlaces(p);
        const titlesScore = Math.min(100, firsts * 35 + seconds * 16 + thirds * 8 + fourths * 4);

        // 3) Rendimiento competitivo: porcentaje de sets ganados.
        const winPct = pctFromRecord(p.sets);
        const winScore = winPct === null ? 40 : winPct;

        // 4) Trayectoria/actividad: cuántos mapas ha disputado en total.
        const rec = parseRecord(p.matches);
        const totalMatches = rec ? rec.w + rec.l : 0;
        const activityScore = Math.min(100, (totalMatches / 20) * 100);

        let score = ptsScore * 0.38 + titlesScore * 0.34 + winScore * 0.16 + activityScore * 0.12;

        // Quien apenas ha competido no puede tener gran renombre internacional,
        // sin importar qué tan bien le haya ido en su único partido.
        if (totalMatches <= 2) score = Math.min(score, 30);
        else if (totalMatches <= 4) score = Math.min(score, 45);

        // Sin puntos ni logros de ningún tipo, la reputación parte de un piso bajo.
        if (!p.points && firsts + seconds + thirds + fourths === 0) score = Math.min(score, 20);

        return Math.max(5, Math.min(99, Math.round(score)));
    }

    const RADAR_ITEMS = [
        { key: "winrate", label: "Victorias %", full: "Porcentaje de Victorias", desc: "Porcentaje de partidas o sets ganados sobre el total jugado.", get: p => pctFromRecord(p.sets) ?? 50 },
        { key: "sets", label: "Sets", full: "Récord de Sets (G-P)", desc: "Balance de sets ganados y perdidos en la competencia.", get: p => pctFromRecord(p.sets) ?? 50 },
        { key: "mapas", label: "Mapas", full: "Récord de Mapas/Modos (PG-PP)", desc: "Balance de mapas o modos ganados y perdidos.", get: p => pctFromRecord(p.matches) ?? 50 },
        { key: "avgpts", label: "Pts/Torneo", full: "Promedio de Puntos por Torneo", desc: "Puntos obtenidos en promedio por cada torneo disputado.", get: p => { const v = computeAvgPointsNum(p); return v === null ? 30 : Math.round((v / (maxAvgPoints() || 1)) * 100); } },
        { key: "pool", label: "Pool", full: "Versatilidad de Pool (Drafteo)", desc: "Qué tan variado y flexible es su repertorio de personajes al draftear.", get: p => computeExtraStat(p, "pool") },
        { key: "zona", label: "Zona", full: "Control de Zona y Posicionamiento", desc: "Capacidad para controlar el mapa y mantener buena posición durante la partida.", get: p => computeExtraStat(p, "zona") },
        { key: "kda", label: "K/D/A", full: "Eficiencia en Combate (K/D/A)", desc: "Relación entre eliminaciones, muertes y asistencias en combate.", get: p => computeExtraStat(p, "kda") },
        { key: "super", label: "Súper", full: "Impacto y Uso del Súper", desc: "Qué tan efectivo es usando su habilidad Súper en el momento correcto.", get: p => computeExtraStat(p, "super") },
        { key: "obj", label: "Objetivos", full: "Toma de Objetivos del Modo de Juego", desc: "Contribución en la captura o cumplimiento de los objetivos del modo.", get: p => computeExtraStat(p, "obj") },
        { key: "superv", label: "Superviv.", full: "Supervivencia y Mitigación de Daño", desc: "Capacidad para sobrevivir y reducir el daño recibido en combate.", get: p => computeExtraStat(p, "superv") }
    ];

    function buildRadarSvg(p) {
        const items = RADAR_ITEMS.map(it => ({ label: it.label, value: Math.max(0, Math.min(100, it.get(p))) }));
        const n = items.length;
        const size = 200;
        const center = size / 2;
        const maxR = 66;
        const angleStep = (2 * Math.PI) / n;
        function pointAt(i, r) {
            const angle = -Math.PI / 2 + i * angleStep;
            return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
        }
        const rings = [0.25, 0.5, 0.75, 1].map(f => {
            const pts = items.map((_, i) => pointAt(i, maxR * f).join(",")).join(" ");
            return `<polygon points="${pts}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;
        }).join("");
        const axes = items.map((_, i) => {
            const [x, y] = pointAt(i, maxR);
            return `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>`;
        }).join("");
        const dataPts = items.map((it, i) => pointAt(i, maxR * (it.value / 100)).join(",")).join(" ");
        const labels = items.map((it, i) => {
            const [x, y] = pointAt(i, maxR + 18);
            let anchor = "middle";
            if (x < center - 6) anchor = "end";
            else if (x > center + 6) anchor = "start";
            const displayVal = Math.round(it.value);
            return `<g class="radar-label-hit" data-idx="${i}">
                <circle cx="${x}" cy="${y}" r="15" fill="transparent" pointer-events="all"/>
                <text x="${x}" y="${y - 5}" text-anchor="${anchor}" dominant-baseline="middle" class="radar-label" pointer-events="none">${it.label}</text>
                <text x="${x}" y="${y + 7}" text-anchor="${anchor}" dominant-baseline="middle" class="radar-value" pointer-events="none">${displayVal}</text>
            </g>`;
        }).join("");
        return `<svg viewBox="0 0 ${size} ${size}" class="stat-radar-svg">
            ${rings}${axes}
            <polygon points="${dataPts}" fill="rgba(111,207,151,0.32)" stroke="#6fcf97" stroke-width="1.5"/>
            ${labels}
        </svg>`;
    }

    function buildGaugeSvg(label, value) {
        const v = Math.max(0, Math.min(100, Math.round(value)));
        const r = 34, cx = 42, cy = 40;
        const circumference = Math.PI * r;
        const dash = (v / 100) * circumference;
        const color = v >= 66 ? "#6fcf97" : v >= 33 ? "#e8c547" : "#ff6b6b";
        const arcPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
        return `<div class="gauge-item">
            <svg viewBox="0 0 84 50" class="gauge-svg">
                <path d="${arcPath}" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="7" stroke-linecap="round"/>
                <path d="${arcPath}" fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round" stroke-dasharray="${dash} ${circumference}"/>
                <text x="${cx}" y="${cy - 4}" text-anchor="middle" class="gauge-value">${v}</text>
            </svg>
            <div class="gauge-label">${label}</div>
        </div>`;
    }

    function findMvpRecognition(p) {
        const found = (p.achievements || []).find(a => /mvp/i.test(a.result || ""));
        if (!found) return null;
        const m = found.result.match(/[^·]*MVP[^·]*/i);
        return (m ? m[0].trim() : "MVP");
    }

    function statField(value, fallback) {
        const empty = value === undefined || value === null || value === "" || value === "--";
        return empty
            ? `<span class="info-field-value unconfirmed">${fallback || "none"}</span>`
            : `<span class="info-field-value">${value}</span>`;
    }

    function bsCategoryHtml(p) {
        const hasTrophies = p.bsMaxTrophies !== undefined && p.bsMaxTrophies !== null && p.bsMaxTrophies !== "";
        const ladderValue = hasTrophies
            ? `<img src="trophies-brawl-stars-hd-download-logo-transparent-23.png" class="bs-value-icon" alt="Trofeos">${p.bsMaxTrophies}`
            : "none";
        const hasRank = p.bsRankedTier && RANK_TIER_IMAGES[p.bsRankedTier];
        const rankValue = hasRank
            ? `<img src="${RANK_TIER_IMAGES[p.bsRankedTier]}" class="bs-rank-icon" alt="${p.bsRankedTier}">${p.bsRankedValue || p.bsRankedTier}`
            : "none";
        return `
        <div class="bs-cat-row">
            <div class="bs-category">
                <div class="bs-cat-header"><img src="icon_trophy.png" class="bs-cat-icon" alt="Escalafón">Escalafón</div>
                <div class="bs-cat-value ${hasTrophies ? "" : "unconfirmed"}">${ladderValue}</div>
            </div>
            <div class="bs-category">
                <div class="bs-cat-header"><img src="PGXQuvMxD7wiFkvTEC72.png" class="bs-cat-icon" alt="Clasificatoria">Clasificatoria</div>
                <div class="bs-cat-value ${hasRank ? "" : "unconfirmed"}">${rankValue}</div>
            </div>
        </div>`;
    }

    function openPlayerModal(p) {
        const panel = document.getElementById("playerInfoPanel");
        const f = FLAGS[p.country];
        const pos = PLAYERS.indexOf(p) + 1;
        const medal = pos === 1 ? "gold" : pos === 2 ? "silver" : pos === 3 ? "bronze" : "";
        const flatCorner = (pos >= 4 && pos <= 7) ? "flat-corner" : "";
        zcPlaySound("entrar");
        const openTier = getRankTier(pos);
        const rankKind = openTier.kind;
        if (rankKind === "master") zcPlayRankSound("master");
        else if (rankKind === "legendary") zcPlayRankSound("legendary");
        else if (rankKind === "pro") zcPlayRankSound("pro");
        else if (rankKind === "mythic") zcPlayRankSound("mythic");
        const rankGlowClass = rankKind ? `pos-glow-${rankKind}` : "";
        const statusClass = p.status === "Activo" ? "active" : "inactive";
        const teamDisplay = p.teamTag ? p.team : "No tiene equipo registrado";
        const teamMuted = p.teamTag ? "" : "muted";
        const idsDisplay = p.alternateIds.length ? p.alternateIds.join(", ") : "No tiene IDs registradas";
        const idsMuted = p.alternateIds.length ? "" : "muted";
        const bornMuted = p.born === "Por confirmar" ? "muted" : "";
        const recentListHtml = p.recent.length
            ? `<div class="recent-list" id="recentList" tabindex="0">${p.recent.map(m => {
                const rc = matchResultClass(p, m);
                const badge = rc === "match-win" ? `<span class="match-badge win">W</span>`
                    : rc === "match-loss" ? `<span class="match-badge loss">L</span>` : "";
                return `
                <div class="match-row ${rc}">
                    <div class="match-row-top">
                        <span>${m.date} · ${m.time || ""}</span>
                        ${badge}
                    </div>
                    <div class="match-row-score">
                        <span>${m.teamA}</span>${scorePairHtml(m.scoreA, m.scoreB)}<span>${m.teamB}</span>
                    </div>
                    <div class="match-row-tourney">${m.tourney}</div>
                </div>
            `;
            }).join("")}</div>`
            : `<div class="match-row"><div class="match-row-top" style="color:#888;">Sin partidas registradas</div></div>`;
        panel.className = `info-panel ${medal} ${flatCorner} ${medal ? "medal-photo-" + medal : ""}`.trim();
        panel.style.backgroundImage = "";
        const mediaHtml = "";
        panel.innerHTML = mediaHtml + `<div class="panel-content">
            <div class="info-top-row">
                <div class="info-position-line">
                    <span class="info-pos-badge ${medal} ${posTierClass(pos)} ${rankGlowClass}">${pos}</span>
                    <span class="info-position-label ${rankGlowClass}">Posición en el ranking</span>
                </div>
                <span class="info-close-x">✕</span>
            </div>
            <div class="info-name"><span class="info-flag">${flagImg(p.country, true)}</span>${p.name}</div>

            <div class="info-block-title" id="infoHeaderEnd">Información del jugador</div>
            <div class="info-grid">
                <div><div class="info-field-label">Nacionalidad</div><div class="info-field-value">${f.name}</div></div>
                <div><div class="info-field-label">Región</div><div class="info-field-value">${f.region}</div></div>
                <div><div class="info-field-label">Nacimiento</div><div class="info-field-value ${bornMuted}">${p.born}</div></div>
                <div><div class="info-field-label">Estado</div><div class="info-field-value ${statusClass}">${p.status}</div></div>
                <div><div class="info-field-label">Rol</div><div class="info-field-value">${p.role}</div></div>
                <div><div class="info-field-label">Equipo</div><div class="info-field-value ${teamMuted}">${teamDisplay}</div></div>
                <div><div class="info-field-label">IDs alternos</div><div class="info-field-value ${idsMuted}">${idsDisplay}</div></div>
                <div><div class="info-field-label">Ganancias aprox.</div><div class="info-field-value">${p.winnings}</div></div>
                <div><div class="info-field-label">Créditos aprox.</div><div class="info-field-value">${p.credits}</div></div>
                <div class="span-2"><div class="info-field-label">Redes sociales</div>${
                    (p.socials && p.socials.length)
                        ? `<div class="contrib-social-list">${p.socials.map(s => `<a class="contrib-social-item" href="${s.url}" target="_blank" rel="noopener"><span class="contrib-social-handle">${s.handle}</span><span class="contrib-social-platform">${s.platform}</span></a>`).join("")}</div>`
                        : `<div class="info-field-value muted">Por confirmar</div>`
                }</div>
            </div>

            <div class="info-block-title">Estadísticas y rendimiento competitivo</div>
            ${(() => {
                const winPct = pctFromRecord(p.sets);
                const setsPct = pctFromRecord(p.sets);
                const matchesPct = pctFromRecord(p.matches);
                const avgNum = computeAvgPointsNum(p);
                const avgPct = avgNum === null ? null : (avgNum / (maxAvgPoints() || 1)) * 100;
                const recognition = pos === 1 ? "MVP" : (p.key === "zyrox" || p.key === "robertbv") ? "Jugador Sorpresa" : (pos === 2 || pos === 3) ? "Jugador Sorpresa" : findMvpRecognition(p);
                const statsSlideHtml = `<div class="info-grid stat-compact">
                    <div><div class="info-field-label">Porcentaje de victorias</div>${statField(computeWinRate(p))}${statBarHtml(winPct)}</div>
                    <div><div class="info-field-label">Récord de sets (G-P)</div>${statField(p.sets)}${statBarHtml(setsPct)}</div>
                    <div><div class="info-field-label">Récord de mapas/modos (PG-PP)</div>${statField(p.matches)}${statBarHtml(matchesPct)}</div>
                    <div><div class="info-field-label">Promedio de puntos por torneo</div>${statField(computeAvgPoints(p))}${statBarHtml(avgPct)}</div>
                    <div class="span-2"><div class="info-field-label">Reconocimientos especiales</div>${statField(recognition)}</div>
                </div>`;
                const radarSlideHtml = `<div class="radar-gauge-row">
                        <div class="stat-radar-wrap">${buildRadarSvg(p)}</div>
                        <div class="gauge-col">
                            ${buildGaugeSvg("Potencial", computePotencial(p))}
                            ${buildGaugeSvg("Habilidades", computeHabilidades(p))}
                            ${buildGaugeSvg("Reputación Int.", computeReputacion(p))}
                        </div>
                    </div>`;
                return renderCarousel([0, 1], (i) => i === 0 ? statsSlideHtml : radarSlideHtml, "", { swipeOnly: true, hideNav: true });
            })()}

            <div class="info-block-title">Datos de Brawl Stars</div>
            <div class="info-grid">
                <div><div class="info-field-label">Player Tag / Player ID</div>${statField(p.bsTag, "none")}</div>
                <div><div class="info-field-label">Brawlers principales</div>${statField((p.bsMains || []).join(", "), "none")}</div>
            </div>
            ${bsCategoryHtml(p)}

            <div class="info-block-title recent-title-row">Partidas recientes</div>
            ${recentListHtml}

            <div class="info-block-title">Logros</div>
            <div class="ach-list">
            ${p.achievements.length ? p.achievements.map(a => {
                const tier = achTierClass(a);
                return `
                <div class="ach-card ${tier}">
                    <div class="ach-top">
                        <span class="ach-date">${a.date}</span>
                        <span class="ach-place ${tier}">${achPlaceLabel(a)}</span>
                    </div>
                    <div class="ach-tournament">${a.tournament}</div>
                    ${a.teamA ? `<div class="ach-score">${a.teamA} ${scorePairHtml(a.scoreA, a.scoreB, true)} ${a.teamB}</div>` : ""}
                    <div class="ach-result">${a.result}</div>
                </div>
            `;
            }).join("") : `<div class="ach-card" style="color:#888;">No hay logros registrados</div>`}
            </div>

            ${isChampion(p) ? `
            <div class="info-block-title">PREMIOS</div>
            <div class="vitrina-card" id="vitrinaCard">
                <img src="mandy-winner.png" class="vitrina-img" alt="Premio">
                <div class="vitrina-label">winner</div>
                <div class="vitrina-date">08-09-26</div>
            </div>` : ""}
        </div>`;
        panel.scrollTop = 0;
        openModal("playerModalOverlay");
        const vitrinaCard = panel.querySelector("#vitrinaCard");
        if (vitrinaCard) vitrinaCard.addEventListener("click", () => openTrophyModal(TROPHIES[0]));
        initCarousels(panel);
        initRadarTooltips(panel);
        const panelMedia = panel.querySelector(".panel-media");
        const headerEnd = panel.querySelector("#infoHeaderEnd");
        if (panelMedia && headerEnd) {
            const offset = headerEnd.offsetTop + headerEnd.offsetHeight;
            panelMedia.style.top = offset + "px";
        }
        const recentListEl = panel.querySelector("#recentList");
        if (recentListEl) {
            const firstRow = recentListEl.querySelector(".match-row");
            if (firstRow) {
                const rowStyle = getComputedStyle(firstRow);
                const mb = parseFloat(rowStyle.marginBottom) || 0;
                recentListEl.style.height = (firstRow.offsetHeight + mb) + "px";
            }
            recentListEl.addEventListener("keydown", (e) => {
                const step = recentListEl.clientHeight || 90;
                if (e.key === "ArrowDown") { e.preventDefault(); recentListEl.scrollBy({ top: step, behavior: "smooth" }); }
                if (e.key === "ArrowUp") { e.preventDefault(); recentListEl.scrollBy({ top: -step, behavior: "smooth" }); }
            });
        }
        const mediaImg = panel.querySelector("#panelMediaImg");
        if (mediaImg) {
            panel.onscroll = () => {
                const offset = Math.round(Math.min(panel.scrollTop * 0.12, 14));
                mediaImg.style.transform = `translateY(${-offset}px)`;
            };
        } else {
            panel.onscroll = null;
        }
    }

    function closePlayerModal() {
        zcPlaySound("salir");
        zcStopRankSound();
        closeModal("playerModalOverlay");
    }

    function openTrophyModal(t) {
        const panel = document.getElementById("trophyInfoPanel");
        if (t.full) {
            panel.className = "info-panel gold";
            panel.innerHTML = `<div class="info-close"><span>✕</span></div>`;
            const original = document.querySelector("#ultimo-partido .match-card");
            const clone = original.cloneNode(true);
            const logoLarge = clone.querySelector(".logo-large");
            if (logoLarge) logoLarge.remove();
            panel.appendChild(clone);
            const summary = document.createElement("div");
            summary.className = "trophy-summary-block";
            summary.innerHTML = `
                <div class="trophy-modal-logo"><img src="${t.logo}" alt="${t.team}"></div>
                <div class="trophy-modal-title">${t.team}</div>
                <div class="trophy-modal-sub">${t.champDate}</div>
                <div class="trophy-modal-tourney">${t.tourney}</div>
                <div class="trophy-modal-mode">${t.mode}</div>
                <div class="trophy-modal-desc">${t.desc}</div>
            `;
            panel.appendChild(summary);
            panel.scrollTop = 0;
            openModal("trophyModalOverlay");
            bindStatRows(clone);
            bindEventItems(clone);
            bindMatchTabs(clone);
            bindMatchStats(clone);
            bindTimelineEntries(clone);
            bindMatchSwipe(clone);
            return;
        }
        panel.className = "info-panel";
        panel.innerHTML = `
            <div class="info-close"><span>✕</span></div>
            <div class="trophy-modal-logo"><img src="${t.logo}" alt="${t.team}"></div>
            <div class="trophy-modal-title">${t.team}</div>
            <div class="trophy-modal-sub">${t.champDate}</div>
            <div class="trophy-modal-tourney">${t.tourney}</div>
            <div class="trophy-modal-mode">${t.mode}</div>
            <div class="trophy-modal-desc">${t.desc}</div>
        `;
        panel.scrollTop = 0;
        openModal("trophyModalOverlay");
    }

    function closeTrophyModal() {
        zcPlaySound("salir");
        closeModal("trophyModalOverlay");
    }

    const QS2_TEAM_INFO = {
        LEV: { logo: "LEV.png", full: "Leviatán Esports" },
        LPR: { logo: "LPR.png", full: "L. Puppies Represent" }
    };
    const QS2_MATCH_SUMMARY = { home: "LEV", away: "LPR", scoreHome: 3, scoreAway: 1, status: "Finalizado" };

    function openQuickStats(row) {
        zcPlaySound("clickentrar");
        const panel = document.getElementById("quickStatsPanel");
        const nameBtn = row.querySelector(".stat-name-btn");
        const photo = row.querySelector(".lu-photo");
        const rating = row.querySelector(".lu-avatar-wrap .lu-rating");
        const detail = row.querySelector(".lu-detail-inner");
        const name = nameBtn ? nameBtn.textContent.trim() : "";
        const photoSrc = photo ? photo.getAttribute("src") : "";
        const ratingValue = rating ? rating.textContent.trim() : "N/A";
        const ratingClass = rating ? rating.className.replace("lu-rating", "").trim() : "rt-na";

        const player = PLAYERS.find(p => p.key === row.dataset.player);
        const teamTag = (player && QS2_TEAM_INFO[player.teamTag]) ? player.teamTag : "LEV";
        const teamInfo = QS2_TEAM_INFO[teamTag];

        const statRows = detail ? Array.from(detail.querySelectorAll(".lu-stat-item")).map(item => {
            const img = item.querySelector("img");
            const bEl = item.querySelector("b");
            const label = img ? img.getAttribute("alt") : item.textContent.split(":")[0].trim();
            const value = bEl ? bEl.textContent.trim() : "";
            return `<div class="qs2-stat-row"><span>${label}</span><b>${value}</b></div>`;
        }).join("") : "";

        const homeInfo = QS2_TEAM_INFO[QS2_MATCH_SUMMARY.home];
        const awayInfo = QS2_TEAM_INFO[QS2_MATCH_SUMMARY.away];

        panel.innerHTML = `
            <div class="info-close"><span class="info-close-x">✕</span></div>
            <div class="qs2-photo-row">
                <img class="qs2-photo" src="${photoSrc}" alt="${name}">
                <div>
                    <div class="qs2-name">${name}</div>
                    <div class="qs2-team-line"><img src="${teamInfo.logo}" alt="${teamTag}">${teamInfo.full}</div>
                </div>
            </div>
            <div class="qs2-match">
                <span class="qs2-match-team"><img src="${homeInfo.logo}" alt="${QS2_MATCH_SUMMARY.home}">${QS2_MATCH_SUMMARY.home}</span>
                <span class="qs2-match-score">${QS2_MATCH_SUMMARY.scoreHome}</span>
                <span class="qs2-match-dash">-</span>
                <span class="qs2-match-score">${QS2_MATCH_SUMMARY.scoreAway}</span>
                <span class="qs2-match-team">${QS2_MATCH_SUMMARY.away}<img src="${awayInfo.logo}" alt="${QS2_MATCH_SUMMARY.away}"></span>
                <span class="qs2-match-status">${QS2_MATCH_SUMMARY.status}</span>
            </div>
            <div class="qs2-stats-title">Estadísticas del partido</div>
            <div class="qs2-rating-row">
                <div>
                    <div class="qs2-rating-label">Calificación del jugador</div>
                    <div class="qs2-rating-sub">Según los datos de los partidos</div>
                </div>
                <span class="qs2-rating-badge lu-rating ${ratingClass}">${ratingValue}</span>
            </div>
            <div class="qs2-stat-list">${statRows}</div>
            <div class="qs2-more-row">
                <button type="button" class="qs2-more-btn" id="qs2MoreBtn">
                    <img class="qs2-more-icon" src="look.png" alt="">
                    <span>Más información sobre ${name}</span>
                </button>
            </div>
        `;
        const moreBtn = panel.querySelector("#qs2MoreBtn");
        if (moreBtn) {
            moreBtn.addEventListener("click", () => {
                if (player) openPlayerModal(player);
            });
        }
        openModal("quickStatsOverlay");
    }

    function closeQuickStats() {
        zcPlaySound("clicksalir");
        closeModal("quickStatsOverlay");
    }

    let scrollLockY = 0;
    let scrollLocked = false;
    function lockBodyScroll() {
        if (scrollLocked) return;
        scrollLocked = true;
        scrollLockY = window.scrollY || window.pageYOffset || 0;
        document.documentElement.style.overflow = "hidden";
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollLockY}px`;
        document.body.style.left = "0";
        document.body.style.right = "0";
        document.body.style.width = "100%";
    }
    function unlockBodyScroll() {
        if (!scrollLocked) return;
        scrollLocked = false;
        document.documentElement.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        window.scrollTo({ top: scrollLockY, left: 0, behavior: "instant" });
    }

    let modalStack = [];

    function openModal(id) {
        const current = document.querySelector(".modal-overlay.active");
        if (current && current.id !== id) {
            // Oculta el modal anterior al instante (sin transición) para evitar que
            // se vea superpuesto/parpadeando mientras el nuevo aparece encima.
            current.style.transition = "none";
            current.classList.remove("active");
            void current.offsetWidth;
            current.style.transition = "";
            modalStack.push(current.id);
        }
        if (mobileMenu && mobileMenu.classList.contains("open")) {
            mobileMenu.classList.remove("open");
            menuToggle.classList.remove("active");
            menuToggle.setAttribute("aria-expanded", "false");
        }
        const el = document.getElementById(id);
        if (el.classList.contains("active")) {
            // Reabrir el mismo modal: forzamos un reflow para reiniciar la
            // transición sin dejar un frame "vacío" en medio.
            el.style.transition = "none";
            el.classList.remove("active");
            void el.offsetWidth;
            el.style.transition = "";
        }
        // El bloqueo de scroll y la activación del overlay se aplican en el
        // mismo tick (sin esperar a un requestAnimationFrame) para que el
        // fondo nunca quede "al descubierto" un frame antes de que el overlay
        // lo cubra — eso es lo que causaba el parpadeo al abrir un menú.
        lockBodyScroll();
        el.classList.add("active");
    }
    function closeModal(id) {
        document.getElementById(id).classList.remove("active");
        if (modalStack.length > 0) {
            const prevId = modalStack.pop();
            document.getElementById(prevId).classList.add("active");
            return;
        }
        const menuEl = document.getElementById("mobileMenu");
        const menuOpen = menuEl && menuEl.classList.contains("open");
        if (!menuOpen) unlockBodyScroll();
    }
    function closeAllModals() {
        modalStack = [];
        document.querySelectorAll(".modal-overlay.active").forEach((el) => el.classList.remove("active"));
        modalImg.src = "";
        zcStopRankSound();
        const menuEl = document.getElementById("mobileMenu");
        const menuOpen = menuEl && menuEl.classList.contains("open");
        if (!menuOpen) unlockBodyScroll();
    }

    document.getElementById("playerModalOverlay").addEventListener("click", function (e) {
        if (e.target === this) closePlayerModal();
    });
    document.getElementById("trophyModalOverlay").addEventListener("click", function (e) {
        if (e.target === this) closeTrophyModal();
    });
    document.getElementById("quickStatsOverlay").addEventListener("click", function (e) {
        if (e.target === this) closeQuickStats();
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeAllModals();
    });
    /* Delegated close-button handling: previously relied on getElementById
       with an id that was re-created on every render (and briefly duplicated
       across the two info panels), which could silently fail to bind a
       listener and leave a modal stuck open/unclosable. Delegating from
       document is immune to that and always works regardless of how many
       times the panel content has been re-rendered. */
    document.addEventListener("click", function (e) {
        if (e.target.closest("#playerInfoPanel .info-close-x")) {
            closePlayerModal();
        } else if (e.target.closest("#trophyInfoPanel .info-close-x, #trophyInfoPanel .info-close")) {
            closeTrophyModal();
        } else if (e.target.closest("#quickStatsPanel .info-close-x")) {
            closeQuickStats();
        }
    });

    renderRanking();
    renderTrophies();
    renderContributions();
    renderLastClassification();
    zcfInit();

    // ZC26 · Overlay "¿Cómo se calcula la Clasificación?" (prefijo "zcelo-")
    const zceloOpenBtn = document.getElementById("zceloOpenBtn");
    const eloDetail = document.getElementById("eloDetail");
    const eloDetailBack = document.getElementById("eloDetailBack");
    if (zceloOpenBtn && eloDetail) {
        zceloOpenBtn.addEventListener("click", () => {
            eloDetail.classList.add("active");
            eloDetail.scrollTop = 0;
            document.body.style.overflow = "hidden";
            zcPlaySound("entrar");
        });
    }
    if (eloDetailBack && eloDetail) {
        eloDetailBack.addEventListener("click", () => {
            eloDetail.classList.remove("active");
            document.body.style.overflow = "";
            zcPlaySound("salir");
        });
    }

    const rankToggleBtn = document.getElementById("rankToggleBtn");
    const rankToggleIcon = document.getElementById("rankToggleIcon");
    const rankToggleLabel = document.getElementById("rankToggleLabel");
    if (rankToggleBtn) {
        rankToggleBtn.addEventListener("click", () => {
            zcPlaySound("click");
            rankingExpanded = !rankingExpanded;
            rankToggleLabel.textContent = rankingExpanded ? "Ocultar Clasificación completa" : "Mostrar Clasificación completa";
            rankToggleIcon.src = rankingExpanded ? "rankingcerrar.png" : "rankingopen.png";
            renderRanking();
        });
    }

    const contribToggleBtn = document.getElementById("contribToggleBtn");
    const contribToggleIcon = document.getElementById("contribToggleIcon");
    const contribToggleLabel = document.getElementById("contribToggleLabel");
    if (contribToggleBtn) {
        contribToggleBtn.addEventListener("click", () => {
            zcPlaySound("click");
            contribExpanded = !contribExpanded;
            contribToggleLabel.textContent = contribExpanded ? "Ocultar Clasificación completa" : "Mostrar Clasificación completa";
            contribToggleIcon.src = contribExpanded ? "rankingcerrar.png" : "rankingopen.png";
            renderContributions();
        });
    }

    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    function openMenu() {
        zcPlaySound("clickentrar");
        document.querySelectorAll(".modal-overlay.active").forEach((el) => el.classList.remove("active"));
        modalStack = [];
        mobileMenu.classList.add("open");
        menuToggle.classList.add("active");
        menuToggle.setAttribute("aria-expanded", "true");
        lockBodyScroll();
    }
    function closeMenu() {
        zcPlaySound("clicksalir");
        mobileMenu.classList.remove("open");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        const anyOpen = document.querySelectorAll(".modal-overlay.active").length > 0;
        if (!anyOpen) unlockBodyScroll();
    }
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", () => {
            mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
        });
        const soundMuteBtn = document.getElementById("soundMuteBtn");
        if (soundMuteBtn) soundMuteBtn.addEventListener("click", zcToggleMute);
        zcUpdateMuteIcon();

        (function initLangSwitcher() {
            const LANG_STORAGE_KEY = "zc26_lang";
            // Los diccionarios reales viven en archivos externos (carpeta /idioma/),
            // no aquí, para no inflar este HTML. Se cargan solo cuando se necesitan.
            // Se cargan con <script src="..."> (no con fetch) para que funcione
            // abriendo el HTML directamente con doble clic, sin necesitar servidor.
            const langFiles = {
                "en": { src: "idioma/en.js", varName: "ZC_LANG_EN" },
                "es-es": { src: "idioma/es-es.js", varName: "ZC_LANG_ES_ES" },
                "pt": { src: "idioma/pt.js", varName: "ZC_LANG_PT" }
            };
            const langShortLabel = {
                "en": "English",
                "es-es": "Español",
                "es-la": "Español",
                "pt": "Português"
            };

            let currentDict = null; // null = es-la (idioma original, sin traducir)
            const dictCache = {};   // cache en memoria para no re-descargar el .txt

            // Traduce un texto exacto (recortando espacios) usando el diccionario activo.
            function zcT(str) {
                if (!currentDict) return str;
                const trimmed = String(str).trim();
                if (!trimmed) return str;
                const hit = currentDict[trimmed];
                return hit !== undefined ? hit : str;
            }
            window.zcT = zcT;

            function translateWithWhitespace(str) {
                if (!currentDict) return str;
                const trimmed = str.trim();
                if (!trimmed) return str;
                const hit = currentDict[trimmed];
                if (hit === undefined) return str;
                const lead = str.match(/^\s*/)[0];
                const trail = str.match(/\s*$/)[0];
                return lead + hit + trail;
            }

            const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "TEXTAREA"]);
            const originalMap = new WeakMap(); // Text node -> texto original en español (LatAm)
            const knownNodes = [];             // lista de todos los Text nodes ya vistos

            function isInsideLangSwitcher(node) {
                let el = node.nodeType === 3 ? node.parentElement : node;
                while (el) {
                    if (el.id === "langSwitcher") return true;
                    el = el.parentElement;
                }
                return false;
            }

            function harvestTextNode(node) {
                if (originalMap.has(node)) return; // ya lo conocemos
                if (isInsideLangSwitcher(node)) return; // no tocar el propio selector de idioma
                if (!node.textContent || !node.textContent.trim()) return;
                originalMap.set(node, node.textContent);
                knownNodes.push(node);
                if (currentDict) node.textContent = translateWithWhitespace(node.textContent);
            }

            function harvestSubtree(root) {
                if (root.nodeType === 3) {
                    harvestTextNode(root);
                    return;
                }
                if (root.nodeType !== 1 || SKIP_TAGS.has(root.nodeName)) return;
                const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
                    acceptNode(n) {
                        if (SKIP_TAGS.has(n.parentNode && n.parentNode.nodeName)) return NodeFilter.FILTER_REJECT;
                        return NodeFilter.FILTER_ACCEPT;
                    }
                });
                let n;
                while ((n = walker.nextNode())) harvestTextNode(n);
            }

            // Atributos estáticos traducibles, capturados una sola vez al cargar.
            const ATTR_NAMES = ["placeholder", "aria-label", "title"];
            const attrRecords = [];
            function harvestAttrs() {
                document.querySelectorAll("[placeholder],[aria-label],[title]").forEach(el => {
                    if (isInsideLangSwitcher(el)) return;
                    ATTR_NAMES.forEach(attr => {
                        if (el.hasAttribute(attr)) {
                            const val = el.getAttribute(attr);
                            if (val && val.trim()) attrRecords.push({ el, attr, original: val });
                        }
                    });
                });
            }

            function applyAll() {
                knownNodes.forEach(node => {
                    const original = originalMap.get(node);
                    node.textContent = currentDict ? translateWithWhitespace(original) : original;
                });
                attrRecords.forEach(rec => {
                    rec.el.setAttribute(rec.attr, currentDict ? translateWithWhitespace(rec.original) : rec.original);
                });
            }

            // Captura inicial de todo lo que ya está en la página.
            harvestSubtree(document.body);
            harvestAttrs();

            // Observador: cualquier contenido nuevo que la página genere después
            // (rankings, contribuciones, buscador, botones "mostrar más"...) se
            // traduce automáticamente en cuanto aparece, sin tocar el resto del código.
            const observer = new MutationObserver(mutations => {
                mutations.forEach(m => {
                    m.addedNodes && m.addedNodes.forEach(node => harvestSubtree(node));
                });
            });
            observer.observe(document.body, { childList: true, subtree: true });

            function loadDict(lang) {
                return new Promise((resolve) => {
                    if (lang === "es-la") { currentDict = null; resolve(); return; }
                    if (dictCache[lang]) { currentDict = dictCache[lang]; resolve(); return; }
                    const info = langFiles[lang];
                    if (!info) { currentDict = null; resolve(); return; }

                    // Si el <script> del idioma ya fue insertado antes, no lo duplicamos.
                    const existing = document.querySelector(`script[data-lang-file="${lang}"]`);
                    if (existing && window[info.varName]) {
                        dictCache[lang] = window[info.varName];
                        currentDict = dictCache[lang];
                        resolve();
                        return;
                    }

                    const script = document.createElement("script");
                    script.src = info.src;
                    script.dataset.langFile = lang;
                    script.onload = () => {
                        const dict = window[info.varName] || {};
                        dictCache[lang] = dict;
                        currentDict = dict;
                        resolve();
                    };
                    script.onerror = (e) => {
                        console.warn("No se pudo cargar el archivo de idioma:", info.src, e);
                        currentDict = null;
                        resolve();
                    };
                    document.head.appendChild(script);
                });
            }

            let currentAppliedLang = null;
            async function applyLanguage(lang) {
                await loadDict(lang);
                applyAll();

                const label = document.getElementById("langToggleLabel");
                if (label) label.textContent = langShortLabel[lang] || "Español";

                document.querySelectorAll(".lang-option").forEach(opt => {
                    opt.classList.toggle("active", opt.dataset.lang === lang);
                });

                document.documentElement.setAttribute("lang", lang === "pt" ? "pt" : (lang === "en" ? "en" : "es"));

                try { localStorage.setItem(LANG_STORAGE_KEY, lang); } catch (e) {}
                currentAppliedLang = lang;
            }

            const langSwitcher = document.getElementById("langSwitcher");
            const langToggleBtn = document.getElementById("langToggleBtn");
            const langDropdown = document.getElementById("langDropdown");

            if (langToggleBtn && langDropdown) {
                langToggleBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const isOpen = langDropdown.classList.toggle("open");
                    langToggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
                });
                langDropdown.querySelectorAll(".lang-option").forEach(opt => {
                    opt.addEventListener("click", () => {
                        if (opt.dataset.lang !== currentAppliedLang) zcPlaySound("cambioidioma");
                        applyLanguage(opt.dataset.lang);
                        langDropdown.classList.remove("open");
                        langToggleBtn.setAttribute("aria-expanded", "false");
                    });
                });
                document.addEventListener("click", (e) => {
                    if (langSwitcher && !langSwitcher.contains(e.target)) {
                        langDropdown.classList.remove("open");
                        langToggleBtn.setAttribute("aria-expanded", "false");
                    }
                });
            }

            let savedLang = "es-la";
            try {
                savedLang = localStorage.getItem(LANG_STORAGE_KEY) || "es-la";
            } catch (e) {}
            applyLanguage(savedLang);
        })();
        mobileMenu.querySelectorAll("[data-menu-link]").forEach(link => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });
    }

    document.querySelectorAll(".section-tab").forEach(tab => {
        tab.addEventListener("click", () => zcPlaySound("cambio"));
    });

    function bindStatRows(root) {
        root.querySelectorAll(".stat-row[data-player]").forEach(row => {
            const isLineupRow = row.classList.contains("lu-row");
            if (!isLineupRow) {
                const toggleDetail = () => {
                    const open = row.classList.toggle("open");
                    zcPlaySound(open ? "clickentrar" : "clicksalir");
                    row.setAttribute("aria-expanded", open ? "true" : "false");
                };
                row.addEventListener("click", (e) => {
                    if (e.target.closest("[data-open-player], [data-quick-stats]")) return;
                    toggleDetail();
                });
                row.addEventListener("keydown", e => {
                    if (e.target === row && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); toggleDetail(); }
                });
            }
            row.querySelectorAll("[data-open-player]").forEach(openBtn => {
                openBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    const player = PLAYERS.find(p => p.key === row.dataset.player);
                    if (player) openPlayerModal(player);
                });
            });
            const quickBtn = row.querySelector("[data-quick-stats]");
            if (quickBtn) {
                quickBtn.addEventListener("click", (e) => {
                    e.stopPropagation();
                    openQuickStats(row);
                });
                quickBtn.addEventListener("keydown", (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        e.stopPropagation();
                        openQuickStats(row);
                    }
                });
            }
        });
    }

    function bindEventItems(root) {
        root.querySelectorAll(".event-item").forEach(el => {
            el.addEventListener("click", function (e) {
                const src = this.getAttribute("data-image");
                if (src) {
                    zcPlaySound("entrar");
                    modalImg.src = src;
                    openModal("modalOverlay");
                } else {
                    alert("Imagen no disponible");
                }
            });
        });
    }

    function bindMatchTabs(root) {
        const tabs = root.querySelectorAll(".match-tab");
        const panels = root.querySelectorAll(".match-tab-panel");
        tabs.forEach(tab => {
            tab.addEventListener("click", () => {
                zcPlaySound("click");
                tabs.forEach(t => t.classList.remove("active"));
                panels.forEach(p => p.classList.remove("active"));
                tab.classList.add("active");
                const target = root.querySelector(`.match-tab-panel[data-tab-panel="${tab.dataset.tab}"]`);
                if (target) target.classList.add("active");
            });
        });
    }
    bindMatchTabs(document);

    function initMvsBars(root) {
        root.querySelectorAll(".mvs-rows .mvs-row").forEach(row => {
            if (row.querySelector(".mvs-bar-row")) return;
            const vals = row.querySelectorAll(".mvs-val");
            if (vals.length !== 2) return;

            const top = document.createElement("div");
            top.className = "mvs-row-top";
            while (row.firstChild) top.appendChild(row.firstChild);
            row.appendChild(top);

            const parseVal = (el) => {
                const num = parseFloat(el.textContent.replace(",", ".").replace(/[^0-9.\-]/g, ""));
                return isNaN(num) ? 0 : num;
            };
            const sideClass = (el) => el.classList.contains("mvs-win-lev") ? "mvs-bar-lev"
                : el.classList.contains("mvs-win-lpr") ? "mvs-bar-lpr"
                : "mvs-bar-neutral";

            const leftVal = parseVal(vals[0]);
            const rightVal = parseVal(vals[1]);
            const maxVal = Math.max(leftVal, rightVal);
            const leftPct = leftVal > 0 && maxVal > 0 ? Math.max(4, Math.round((leftVal / maxVal) * 100)) : 0;
            const rightPct = rightVal > 0 && maxVal > 0 ? Math.max(4, Math.round((rightVal / maxVal) * 100)) : 0;

            const barRow = document.createElement("div");
            barRow.className = "mvs-bar-row";
            barRow.innerHTML =
                `<div class="mvs-bar-track mvs-bar-track-left"><div class="mvs-bar-fill ${sideClass(vals[0])}" style="width:${leftPct}%"></div></div>` +
                `<div class="mvs-bar-track mvs-bar-track-right"><div class="mvs-bar-fill ${sideClass(vals[1])}" style="width:${rightPct}%"></div></div>`;
            row.appendChild(barRow);
        });
    }

    function bindMatchStats(root) {
        initMvsBars(root);
        root.querySelectorAll(".mvs-wrap").forEach(wrap => {
        const mvsTabs = wrap.querySelectorAll(".mvs-tab");
        const rows = wrap.querySelectorAll(".mvs-rows [data-cat]");
        const moreBtn = wrap.querySelector("[data-mvs-more]");
        let active = "clave";
        let expanded = false;

        function render() {
            rows.forEach(row => {
                const cats = row.dataset.cat.split(" ");
                let show = cats.includes(active);
                if (show && active === "generales" && row.dataset.extra === "1" && !expanded) {
                    show = false;
                }
                row.style.display = show ? "" : "none";
            });
            if (moreBtn) {
                moreBtn.style.display = active === "generales" ? "block" : "none";
                moreBtn.textContent = expanded ? "Mostrar menos" : "Mostrar más";
            }
        }

        mvsTabs.forEach(tab => {
            tab.addEventListener("click", () => {
                zcPlaySound("click");
                mvsTabs.forEach(t => t.classList.remove("active"));
                tab.classList.add("active");
                active = tab.dataset.mvsTab;
                render();
            });
        });

        if (moreBtn) {
            moreBtn.addEventListener("click", () => {
                zcPlaySound("click");
                expanded = !expanded;
                render();
            });
        }

        render();
        });
    }
    bindMatchStats(document);

    function bindTimelineEntries(root) {
        root.querySelectorAll(".timeline-entry[data-open-player]").forEach(el => {
            el.addEventListener("click", () => {
                const player = PLAYERS.find(p => p.key === el.dataset.openPlayer);
                if (player) openPlayerModal(player);
            });
        });
    }
    bindTimelineEntries(document);

    function bindMatchSwipe(root) {
        const swipe = root.querySelector(".match-swipe");
        if (!swipe) return;
        const slides = Array.from(swipe.querySelectorAll(".match-swipe-slide"));
        if (slides.length < 2) return;

        function currentSlide() {
            const width = swipe.clientWidth || 1;
            const idx = Math.round(swipe.scrollLeft / width);
            return slides[Math.max(0, Math.min(idx, slides.length - 1))];
        }
        function setHeightFor(slide) {
            if (!slide) return;
            swipe.style.height = slide.scrollHeight + "px";
        }
        function updateHeight() {
            setHeightFor(currentSlide());
        }

        let ticking = false;
        swipe.addEventListener("scroll", () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => { updateHeight(); ticking = false; });
            }
        });
        window.addEventListener("resize", updateHeight);
        window.addEventListener("load", updateHeight);
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(updateHeight);
        }
        updateHeight();
        requestAnimationFrame(updateHeight);
        requestAnimationFrame(() => requestAnimationFrame(updateHeight));
        setTimeout(updateHeight, 150);
        setTimeout(updateHeight, 500);
    }
    bindMatchSwipe(document);

    const overlay = document.getElementById('modalOverlay');
    const modalImg = document.getElementById('modalImage');
    bindStatRows(document);
    bindEventItems(document);
    overlay.addEventListener('click', function(e) {
        if (e.target === this || e.target === document.getElementById('closeModal')) {
            zcPlaySound("salir");
            closeModal('modalOverlay');
            modalImg.src = '';
        }
    });

    /* ======================================================================
       DESTACADAS (STORIES) — lógica de reproducción tipo Instagram/FIFA
    ====================================================================== */
    (function () {
        const IMAGE_DURATION_MS = 10000; // 10s por imagen

        // Definición de cada destacada. "items" es la lista de páginas dentro de esa historia.
        const STORIES = {
            "lev-winner": {
                username: "LEV WINNER",
                avatar: "news/LEVCHAMP.jpg",
                music: "news/song_leyend.ogg", // suena en bucle mientras dura esta historia
                items: [
                    { type: "image", src: "news/LEVCHAMP.jpg", duration: IMAGE_DURATION_MS }
                ]
            },
            "matches-aug8": {
                username: "MATCHES, AUG 8",
                avatar: "news/matchaug8(4).jpg",
                music: "news/song_misery.ogg", // suena en bucle mientras dura esta historia
                items: [
                    { type: "image", src: "news/matchaug8(4).jpg", duration: IMAGE_DURATION_MS },
                    { type: "image", src: "news/matchaug8(3).jpg", duration: IMAGE_DURATION_MS },
                    { type: "image", src: "news/matchaug8(2).jpg", duration: IMAGE_DURATION_MS },
                    { type: "image", src: "news/matchaug8(1).jpg", duration: IMAGE_DURATION_MS }
                ]
            },
            "bsc-aug8": {
                username: "BSC, AUG 8",
                avatar: "LEV.png",
                music: null,
                ctaLabel: "Ver completo",
                ctaUrl: "https://youtube.com/shorts/y7jDOjuQcy4?si=zRnHhpw6-JHaWb1h",
                items: [
                    { type: "video", src: "news/LEVLPR.mp4" }
                ]
            },
            "resumen-agosto": {
                username: "RESUMEN AGOSTO",
                avatar: "news/novedades8aug1.png",
                music: null,
                items: [
                    { type: "image", src: "news/novedades8aug1.png", duration: IMAGE_DURATION_MS }
                ]
            },
            "brawler-blast": {
                username: "BRAWLER BLAST",
                avatar: "news/novedades2sep2.jpg",
                music: null,
                items: [
                    { type: "image", src: "news/novedades2sep2.jpg", duration: IMAGE_DURATION_MS }
                ]
            },
            "clip-1": {
                username: "GRAN FINAL",
                avatar: "clip/clip(1).png",
                music: null,
                items: [ { type: "video", src: "clip/video(1).mp4" } ]
            },
            "clip-2": {
                username: "TAIKISHA, MVP",
                avatar: "clip/clip(2).png",
                music: null,
                items: [ { type: "video", src: "clip/video(2).mp4" } ]
            },
            "clip-3": {
                username: "PUNTO DE CAMPEONATO",
                avatar: "clip/clip(3).png",
                music: null,
                items: [ { type: "video", src: "clip/video(3).mp4" } ]
            },
            "clip-4": {
                username: "MEJOR JUGADA",
                avatar: "clip/clip(4).png",
                music: null,
                items: [ { type: "video", src: "clip/video(4).mp4" } ]
            },
            "clip-5": {
                username: "HIGHLIGHTS",
                avatar: "clip/clip(5).png",
                music: null,
                items: [ { type: "video", src: "clip/video(5).mp4" } ]
            }
        };

        const STORY_ORDER = ["lev-winner", "matches-aug8", "bsc-aug8", "resumen-agosto", "brawler-blast", "clip-1", "clip-2", "clip-3", "clip-4", "clip-5"];

        // Nombre a mostrar en el reproductor (icono de disco) para cada
        // canción de fondo de una destacada.
        const SONG_NAMES = {
            "news/song_leyend.ogg": "WE ON GO - BIA",
            "news/song_misery.ogg": "I Miss That Kind of Misery - cynthoni"
        };

        const viewer = document.getElementById("storyViewer");
        const mediaWrap = document.getElementById("storyViewerMedia");
        const progressRow = document.getElementById("storyProgressRow");
        const usernameEl = document.getElementById("storyViewerUsername");
        const musicPlayerEl = document.getElementById("storyMusicPlayer");
        const musicNameEl = document.getElementById("storyMusicName");
        const muteBtn = document.getElementById("storyMuteBtn");
        const muteIcon = document.getElementById("storyMuteIcon");
        const closeBtn = document.getElementById("storyCloseBtn");
        const zoneBack = document.getElementById("storyZoneBack");
        const zoneNext = document.getElementById("storyZoneNext");
        const ctaBtn = document.getElementById("storyCtaBtn");

        let currentStoryId = null;
        let currentItemIndex = 0;
        let currentMediaEl = null;
        let outgoingMediaEl = null;
        let pendingOutgoingSlideTimer = null;
        const STORY_CROSSFADE_MS = 220;
        let bgAudio = null;
        let storyMuted = localStorage.getItem("zcStoryMuted") === "1";
        let isPaused = false;
        let progressTimer = null;
        let progressStartTime = 0;
        let progressDuration = 0;
        let progressElapsedAtPause = 0;

        function updateMuteIcon() {
            muteIcon.onerror = () => {
                console.error("[ZC26] No se pudo cargar el ícono de sonido:", muteIcon.src, "→ revisa que el archivo .png exista con ese nombre exacto.");
            };
            muteIcon.src = storyMuted ? "sound_onmuted.png" : "sound_offmuted.png";
        }
        updateMuteIcon();

        function buildProgressBars(count) {
            progressRow.innerHTML = "";
            for (let i = 0; i < count; i++) {
                const track = document.createElement("div");
                track.className = "story-progress-track";
                const fill = document.createElement("div");
                fill.className = "story-progress-fill";
                track.appendChild(fill);
                progressRow.appendChild(track);
            }
        }

        function setBarState(index, state) {
            // state: "done" | "active" | "pending"
            const tracks = progressRow.querySelectorAll(".story-progress-track");
            const track = tracks[index];
            if (!track) return;
            const fill = track.querySelector(".story-progress-fill");
            fill.style.transition = "none";
            if (state === "done") {
                fill.style.width = "100%";
            } else if (state === "pending") {
                fill.style.width = "0%";
            } else if (state === "active") {
                fill.style.width = "0%";
                void fill.offsetWidth; // forzar reflow para poder animar después
            }
        }

        function refreshActiveTrackClass() {
            // La barra activa se ensancha (mismo diseño que Novedades: 1 ancha, resto finas)
            const tracks = progressRow.querySelectorAll(".story-progress-track");
            tracks.forEach((t, i) => t.classList.toggle("is-active", i === currentItemIndex));
        }

        function animateActiveBar(index, durationMs) {
            const tracks = progressRow.querySelectorAll(".story-progress-track");
            const track = tracks[index];
            if (!track) return;
            const fill = track.querySelector(".story-progress-fill");
            fill.style.transition = `width ${durationMs}ms linear`;
            // doble rAF: asegura que el navegador ya aplicó width:0% antes de animar a 100%,
            // evitando el "salto"/tirón que aparece si se anima en el mismo frame del reset.
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    fill.style.width = "100%";
                });
            });
        }

        function stopBgMusic() {
            if (bgAudio) {
                const old = bgAudio;
                bgAudio = null;
                // fade-out corto para que el corte no se sienta brusco
                let vol = old.volume;
                const fade = setInterval(() => {
                    vol -= 0.25;
                    if (vol <= 0) {
                        clearInterval(fade);
                        old.pause();
                        old.currentTime = 0;
                    } else {
                        old.volume = vol;
                    }
                }, 30);
            }
        }

        function startBgMusic(src) {
            stopBgMusic();
            if (!src) return;
            const audio = new Audio(src);
            audio.loop = true;
            audio.muted = storyMuted;
            audio.volume = 1;
            audio.addEventListener("error", () => {
                console.error("[ZC26] No se pudo cargar el audio de la historia:", src, "→ revisa que el archivo exista exactamente con ese nombre y mayúsculas/minúsculas.");
            });
            audio.play().catch((err) => {
                console.warn("[ZC26] audio.play() falló para", src, err);
            });
            bgAudio = audio;
        }

        // Muestra/oculta el icono de disco + nombre de la canción según si la
        // destacada actual tiene música de fondo, y reinicia el efecto de
        // "sale y vuelve a entrar" del texto cada vez que cambia la canción.
        function updateMusicWidget(src) {
            const name = src ? SONG_NAMES[src] : null;
            if (!name) {
                musicPlayerEl.classList.remove("visible");
                musicNameEl.textContent = "";
                return;
            }
            musicNameEl.textContent = name;
            musicPlayerEl.classList.add("visible");
            // reiniciar la animación desde el principio (si no, al cambiar de
            // canción seguiría a mitad de camino en vez de empezar de nuevo)
            musicNameEl.style.animation = "none";
            void musicNameEl.offsetWidth;
            musicNameEl.style.animation = "";
        }

        // Devuelve el <video> "nítido" (primer plano) actualmente mostrado, sea
        // que currentMediaEl sea un <video> suelto o un wrapper .story-slide.
        function getFgVideo() {
            if (!currentMediaEl) return null;
            if (currentMediaEl.tagName === "VIDEO") return currentMediaEl;
            const fg = currentMediaEl.querySelector(".story-slide-fg");
            return (fg && fg.tagName === "VIDEO") ? fg : null;
        }
        // Devuelve el <video> borroso de fondo, si el item actual es un video.
        function getBgVideo() {
            if (!currentMediaEl || currentMediaEl.tagName === "VIDEO") return null;
            const bg = currentMediaEl.querySelector(".story-slide-bg");
            return (bg && bg.tagName === "VIDEO") ? bg : null;
        }

        function cleanupSlideEl(el) {
            if (!el) return;
            el.querySelectorAll("video").forEach(v => {
                v.pause();
                v.removeAttribute("src");
                v.load();
            });
            if (el.tagName === "VIDEO") {
                el.pause();
                el.removeAttribute("src");
                el.load();
            }
            el.remove();
        }

        function scheduleOutgoingSlideCleanup(previousSlideEl) {
            if (!previousSlideEl) return;
            outgoingMediaEl = previousSlideEl;
            pendingOutgoingSlideTimer = setTimeout(() => {
                cleanupSlideEl(outgoingMediaEl);
                outgoingMediaEl = null;
                pendingOutgoingSlideTimer = null;
            }, STORY_CROSSFADE_MS);
        }

        function clearMediaEl() {
            if (pendingOutgoingSlideTimer) {
                clearTimeout(pendingOutgoingSlideTimer);
                pendingOutgoingSlideTimer = null;
            }
            if (outgoingMediaEl) {
                cleanupSlideEl(outgoingMediaEl);
                outgoingMediaEl = null;
            }
            if (currentMediaEl) {
                cleanupSlideEl(currentMediaEl);
                currentMediaEl = null;
            }
        }

        function clearProgressTimer() {
            if (progressTimer) {
                clearTimeout(progressTimer);
                progressTimer = null;
            }
        }

        // Precarga silenciosa de la siguiente imagen para que el cambio sea instantáneo,
        // sin el parpadeo/"lag" de esperar la descarga al momento de mostrarla.
        const preloadCache = new Set();
        function preloadNextImage() {
            const story = STORIES[currentStoryId];
            if (!story) return;
            const nextItem = story.items[currentItemIndex + 1];
            if (nextItem && nextItem.type === "image" && !preloadCache.has(nextItem.src)) {
                const pre = new Image();
                pre.src = nextItem.src;
                preloadCache.add(nextItem.src);
            }
        }

        function goToStory(storyId, itemIndex) {
            const story = STORIES[storyId];
            if (!story) return;
            currentStoryId = storyId;
            currentItemIndex = Math.max(0, Math.min(itemIndex, story.items.length - 1));

            usernameEl.textContent = story.username;

            if (story.ctaLabel && story.ctaUrl) {
                ctaBtn.textContent = story.ctaLabel;
                ctaBtn.href = story.ctaUrl;
                ctaBtn.classList.add("visible");
            } else {
                ctaBtn.classList.remove("visible");
                ctaBtn.removeAttribute("href");
            }

            // Siempre reconstruir las barras al entrar a una historia nueva,
            // así no queda ningún estado "sucio" de la historia anterior.
            buildProgressBars(story.items.length);

            // marcar como visto en la barra de destacadas / momentos
            const storyBtn = document.querySelector(`[data-story-id="${storyId}"]`);
            if (storyBtn) storyBtn.classList.add("story-seen");

            startBgMusic(story.music);
            updateMusicWidget(story.music);
            renderItem();
        }

        function renderItem() {
            // No borramos el slide actual todavía: lo dejamos visible como fondo
            // y el nuevo se desvanece encima (crossfade), así se evita el
            // parpadeo negro al cambiar de imagen/destacada.
            if (pendingOutgoingSlideTimer) {
                clearTimeout(pendingOutgoingSlideTimer);
                pendingOutgoingSlideTimer = null;
            }
            if (outgoingMediaEl) {
                cleanupSlideEl(outgoingMediaEl);
                outgoingMediaEl = null;
            }
            const previousSlideEl = currentMediaEl;
            currentMediaEl = null;
            clearProgressTimer();

            const story = STORIES[currentStoryId];
            const item = story.items[currentItemIndex];

            // Actualizar estado visual de las barras: anteriores llenas, futuras vacías
            story.items.forEach((_, i) => {
                if (i < currentItemIndex) setBarState(i, "done");
                else if (i > currentItemIndex) setBarState(i, "pending");
            });
            setBarState(currentItemIndex, "active");
            refreshActiveTrackClass();
            preloadNextImage();

            if (item.type === "image") {
                const slide = document.createElement("div");
                slide.className = "story-slide";

                const bg = document.createElement("img");
                bg.className = "story-slide-bg";
                bg.src = item.src;
                bg.alt = "";
                bg.setAttribute("aria-hidden", "true");

                const fg = document.createElement("img");
                fg.className = "story-slide-fg";
                fg.onerror = () => {
                    console.error("[ZC26] No se pudo cargar la imagen de la historia:", item.src, "→ revisa la ruta/nombre exacto del archivo.");
                };
                fg.src = item.src;
                fg.alt = "";

                slide.appendChild(bg);
                slide.appendChild(fg);
                mediaWrap.appendChild(slide);
                currentMediaEl = slide;
                scheduleOutgoingSlideCleanup(previousSlideEl);
                startProgress(item.duration);
            } else if (item.type === "video") {
                const slide = document.createElement("div");
                slide.className = "story-slide";

                const bgVideo = document.createElement("video");
                bgVideo.className = "story-slide-bg";
                bgVideo.src = item.src;
                bgVideo.muted = true;
                bgVideo.autoplay = true;
                bgVideo.loop = true;
                bgVideo.playsInline = true;
                bgVideo.tabIndex = -1;
                bgVideo.setAttribute("aria-hidden", "true");

                const video = document.createElement("video");
                video.className = "story-slide-fg";
                video.src = item.src;
                video.autoplay = true;
                video.playsInline = true;
                video.muted = storyMuted;

                slide.appendChild(bgVideo);
                slide.appendChild(video);
                mediaWrap.appendChild(slide);
                currentMediaEl = slide;
                scheduleOutgoingSlideCleanup(previousSlideEl);
                video.addEventListener("loadedmetadata", () => {
                    const durMs = (isFinite(video.duration) && video.duration > 0) ? video.duration * 1000 : 15000;
                    startProgress(durMs);
                });
                video.addEventListener("ended", () => advance());
                video.play().catch(() => {});
                bgVideo.play().catch(() => {});
            }
        }

        function startProgress(durationMs) {
            progressDuration = durationMs;
            progressStartTime = Date.now();
            progressElapsedAtPause = 0;
            animateActiveBar(currentItemIndex, durationMs);
            clearProgressTimer();
            progressTimer = setTimeout(() => advance(), durationMs);
        }

        function pauseStory() {
            if (isPaused) return;
            isPaused = true;
            progressElapsedAtPause = Date.now() - progressStartTime;
            clearProgressTimer();
            if (bgAudio) bgAudio.pause();
            const fgV1 = getFgVideo(); if (fgV1) fgV1.pause();
            const bgV1 = getBgVideo(); if (bgV1) bgV1.pause();
            // congelar la barra en su ancho actual
            const tracks = progressRow.querySelectorAll(".story-progress-track");
            const track = tracks[currentItemIndex];
            if (track) {
                const fill = track.querySelector(".story-progress-fill");
                const computedWidth = getComputedStyle(fill).width;
                fill.style.transition = "none";
                fill.style.width = computedWidth;
            }
        }

        function resumeStory() {
            if (!isPaused) return;
            isPaused = false;
            const remaining = Math.max(50, progressDuration - progressElapsedAtPause);
            if (bgAudio) bgAudio.play().catch(() => {});
            const fgV2 = getFgVideo(); if (fgV2) fgV2.play().catch(() => {});
            const bgV2 = getBgVideo(); if (bgV2) bgV2.play().catch(() => {});
            const tracks = progressRow.querySelectorAll(".story-progress-track");
            const track = tracks[currentItemIndex];
            if (track) {
                const fill = track.querySelector(".story-progress-fill");
                fill.style.transition = `width ${remaining}ms linear`;
                requestAnimationFrame(() => { fill.style.width = "100%"; });
            }
            progressStartTime = Date.now() - progressElapsedAtPause;
            clearProgressTimer();
            progressTimer = setTimeout(() => advance(), remaining);
        }

        function advance() {
            const story = STORIES[currentStoryId];
            if (currentItemIndex < story.items.length - 1) {
                currentItemIndex++;
                renderItem();
                refreshActiveTrackClass();
            } else {
                goToNextStory();
            }
        }

        function goBack() {
            const story = STORIES[currentStoryId];
            if (currentItemIndex > 0) {
                currentItemIndex--;
                renderItem();
                refreshActiveTrackClass();
            } else {
                goToPrevStory();
            }
        }

        function goToNextStory() {
            const idx = STORY_ORDER.indexOf(currentStoryId);
            if (idx < STORY_ORDER.length - 1) {
                goToStory(STORY_ORDER[idx + 1], 0);
            } else {
                closeViewer();
            }
        }

        function goToPrevStory() {
            const idx = STORY_ORDER.indexOf(currentStoryId);
            if (idx > 0) {
                goToStory(STORY_ORDER[idx - 1], 0);
            } else {
                // ya está en la primera; reinicia su primer item
                renderItem();
            }
        }

        function openViewer(storyId) {
            viewer.classList.add("active");
            document.body.style.overflow = "hidden";
            goToStory(storyId, 0);
        }

        function closeViewer() {
            viewer.classList.remove("active");
            document.body.style.overflow = "";
            clearProgressTimer();
            clearMediaEl();
            stopBgMusic();
            updateMusicWidget(null);
            currentStoryId = null;
            isPaused = false;
        }

        // Abrir historia al tocar el círculo de Destacadas o una tarjeta de Momentos
        document.querySelectorAll(".story-item, .momento-card").forEach(btn => {
            btn.addEventListener("click", () => {
                zcPlaySound("click");
                openViewer(btn.getAttribute("data-story-id"));
            });
        });

        // Cerrar
        closeBtn.addEventListener("click", () => {
            zcPlaySound("salir");
            closeViewer();
        });

        // El botón "Ver completo" no debe disparar la navegación por tap
        ctaBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            zcPlaySound("click");
        });

        // Silenciar / activar sonido (afecta música de fondo y video)
        muteBtn.addEventListener("click", () => {
            storyMuted = !storyMuted;
            localStorage.setItem("zcStoryMuted", storyMuted ? "1" : "0");
            updateMuteIcon();
            if (bgAudio) bgAudio.muted = storyMuted;
            const fgV3 = getFgVideo(); if (fgV3) fgV3.muted = storyMuted;
        });

        // Avanzar / retroceder con tap (evitar doble disparo si viene de un tap táctil)
        let lastTapNav = 0;
        function navOnce(fn) {
            const now = Date.now();
            if (now - lastTapNav < 250) return; // anti-rebote: evita saltos dobles por tap+click
            lastTapNav = now;
            fn();
        }
        zoneNext.addEventListener("click", () => navOnce(advance));
        zoneBack.addEventListener("click", () => navOnce(goBack));

        // Mantener presionado para pausar
        let pressTimer = null;
        function bindHoldToPause(zone) {
            const start = () => {
                pressTimer = setTimeout(() => pauseStory(), 180);
            };
            const end = () => {
                clearTimeout(pressTimer);
                if (isPaused) resumeStory();
            };
            zone.addEventListener("touchstart", start, { passive: true });
            zone.addEventListener("touchend", end);
            zone.addEventListener("touchcancel", end);
            zone.addEventListener("mousedown", start);
            zone.addEventListener("mouseup", end);
            zone.addEventListener("mouseleave", () => { if (isPaused) end(); });
        }
        bindHoldToPause(zoneBack);
        bindHoldToPause(zoneNext);

        // Cerrar con Escape (accesibilidad en desktop)
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && viewer.classList.contains("active")) closeViewer();
        });
    })();

    /* ======================================================================
       NOVEDADES — feed deslizable con barras de progreso (15s c/u)
       La barra de la novedad activa se ve ancha (como en el ejemplo de FIFA);
       las demás quedan finas. Se puede deslizar con el dedo o esperar a que
       avance sola. Solo el botón "Más info." abre el detalle.
    ====================================================================== */
    (function () {
        const NOVEDAD_DURATION_MS = 15000; // 15s por novedad
        const card = document.getElementById("novedadesCard");
        if (!card) return;

        const progressRow = document.getElementById("novedadesProgressRow");
        const trackEl = document.getElementById("novedadesTrack");
        const slides = Array.from(card.querySelectorAll(".novedad-slide"));
        const total = slides.length;

        let currentIndex = 0;
        let timer = null;
        let isUserScrolling = false;
        let scrollEndTimeout = null;
        let programmaticScroll = false;

        // construir barras de progreso (una por novedad)
        slides.forEach(() => {
            const barTrack = document.createElement("div");
            barTrack.className = "novedades-progress-track";
            const fill = document.createElement("div");
            fill.className = "novedades-progress-fill";
            barTrack.appendChild(fill);
            progressRow.appendChild(barTrack);
        });

        const tracks = progressRow.querySelectorAll(".novedades-progress-track");

        function setBar(index, state) {
            const track = tracks[index];
            if (!track) return;
            const fill = track.querySelector(".novedades-progress-fill");
            fill.style.transition = "none";
            if (state === "done") fill.style.width = "100%";
            else if (state === "pending") fill.style.width = "0%";
            else if (state === "active") { fill.style.width = "0%"; void fill.offsetWidth; }
        }

        function animateBar(index) {
            const track = tracks[index];
            const fill = track.querySelector(".novedades-progress-fill");
            fill.style.transition = `width ${NOVEDAD_DURATION_MS}ms linear`;
            requestAnimationFrame(() => { fill.style.width = "100%"; });
        }

        function render() {
            tracks.forEach((t, i) => t.classList.toggle("is-active", i === currentIndex));
            slides.forEach((_, i) => {
                if (i < currentIndex) setBar(i, "done");
                else if (i > currentIndex) setBar(i, "pending");
            });
            setBar(currentIndex, "active");
            animateBar(currentIndex);
        }

        function clearTimer() {
            if (timer) { clearTimeout(timer); timer = null; }
        }

        function scheduleNext() {
            clearTimer();
            timer = setTimeout(() => {
                const nextIndex = (currentIndex + 1) % total;
                goTo(nextIndex);
            }, NOVEDAD_DURATION_MS);
        }

        function scrollToSlide(index) {
            programmaticScroll = true;
            trackEl.scrollTo({ left: trackEl.clientWidth * index, behavior: "smooth" });
            // liberar el flag una vez termina el scroll suave
            setTimeout(() => { programmaticScroll = false; }, 500);
        }

        function goTo(index) {
            currentIndex = ((index % total) + total) % total;
            clearTimer();
            render();
            scrollToSlide(currentIndex);
            scheduleNext();
        }

        // El usuario desliza manualmente: detectamos a qué novedad llegó y
        // sincronizamos las barras con esa posición, sin esperar el timer.
        function syncToScrollPosition() {
            liveSync();
            isUserScrolling = false;
            scheduleNext();
        }

        // Sincroniza las barras EN VIVO mientras el dedo va deslizando,
        // en vez de esperar a que el scroll termine por completo.
        let liveSyncRAF = null;
        function liveSync() {
            const newIndex = Math.max(0, Math.min(Math.round(trackEl.scrollLeft / trackEl.clientWidth), total - 1));
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                render();
            }
        }
        function scheduleLiveSync() {
            if (liveSyncRAF) return;
            liveSyncRAF = requestAnimationFrame(() => {
                liveSyncRAF = null;
                liveSync();
            });
        }

        if ("onscrollend" in window) {
            // API moderna: dispara justo cuando el scroll (y el snap) terminan, sin retrasos artificiales
            trackEl.addEventListener("scroll", () => {
                if (programmaticScroll) return;
                isUserScrolling = true;
                clearTimer();
                scheduleLiveSync();
            }, { passive: true });
            trackEl.addEventListener("scrollend", () => {
                if (programmaticScroll) return;
                syncToScrollPosition();
            });
        } else {
            // Fallback para navegadores sin scrollend
            trackEl.addEventListener("scroll", () => {
                if (programmaticScroll) return;
                isUserScrolling = true;
                clearTimer();
                scheduleLiveSync();
                clearTimeout(scrollEndTimeout);
                scrollEndTimeout = setTimeout(syncToScrollPosition, 100);
            }, { passive: true });
        }

        render();
        scheduleNext();

        // ===================== DETALLE DE NOVEDAD =====================
        const NOVEDAD_DETAILS = {
            0: {
                tag: "ZC26 ESPORTS™",
                title: "Regresa la ZC26 Brawl Stars este mes de septiembre",
                hero: "news/novedades25sep1.jpg",
                paragraphs: [
                    "Estimada comunidad, nos alegra mucho ponernos en contacto con ustedes para compartir varias novedades importantes sobre el desarrollo de nuestros torneos. Como bien recordarán, en la última edición el equipo de Levantan Esports se quedó con el primer lugar tras una excelente participación.",
                    "Después de ese evento, nos tomamos un tiempo fuera de las canchas para planificar todo con calma, pero la espera terminó y estamos de vuelta oficialmente con una nueva entrega de la ZC26. En esta oportunidad, volveremos a medir el nivel de todos en la modalidad de tres contra tres dentro de Brawl Stars.",
                    "La estructura del torneo está pensada para mantener la emoción de principio a fin, ya que será una competencia intensa donde solo un equipo logrará llevarse el trofeo de campeón. Sabemos que la exigencia es alta, por lo que esperamos ver partidas muy disputadas entre los mejores grupos que se presenten.",
                    "Para esta edición decidimos renovar varias cosas. Incorporamos nuevas reglas y mecánicas de juego que buscan equilibrar la cancha para todos los participantes. La idea principal es que cada equipo compita en igualdad de condiciones, sin ventajas injustas para nadie.",
                    "Además, contaremos con un equipo de moderación dedicado a revisar cada partida de cerca, asegurando que el ambiente se mantenga limpio, respetuoso y ordenado durante los días de competencia.",
                    "Otro punto en el que pusimos mucho esfuerzo fue en la claridad del reglamento. Queremos que cualquier persona que tenga ganas de jugar pueda entender el formato sin complicaciones, incluso si es la primera vez que participa en un torneo de este tipo.",
                    "No hace falta ser un experto en competencias para sumarse; las guías y las instrucciones están redactadas de forma sencilla para que todos sepan exactamente cómo inscribirse, cómo reportar sus resultados y cómo avanzar en cada fase.",
                    "Los invitamos a ponerse de acuerdo con sus compañeros, armar sus alineaciones con tiempo y empezar a practicar. En los próximos días seguiremos publicando más detalles sobre los horarios y la forma de registro, así que manténganse atentos a los anuncios."
                ]
            },
            1: {
                tag: "ZC26 ESPORTS™",
                title: "LEVIATÁN ESPORTS se corona CAMPEÓN de la ZC26 Agosto",
                hero: "news/novedades8aug1.png",
                paragraphs: [
                    "El torneo oficial de tres contra tres de Brawl Stars ha llegado a su final, consagrando a Leviatán Esports como el gran campeón de esta edición inaugural. La jornada de competencia estuvo marcada por un nivel técnico sobresaliente y series de alta intensidad en cada una de las rondas disputadas.",
                    "Antes del inicio de los enfrentamientos en la gran final, ambos equipos aplicaron su estrategia en la fase de vetos. Quedaron excluidos de la partida los personajes Belle, Spike, Bibi y Nori, lo que obligó a las escuadras a replantear sus composiciones tácticas para la serie decisiva.",
                    "El desarrollo del encuentro final mostró un desempeño firme por parte de Leviatán Esports, superando a su rival por un marcador de tres sets a uno. El primer set se jugó en el mapa Neumáticos Maniáticos, donde Leviatán tomó la ventaja inicial con una victoria limpia de dos a cero.",
                    "En el segundo mapa, Roca de Belle, el conjunto rival logró responder y empatar la serie al adjudicarse el punto con un resultado de dos a uno. Sin embargo, Leviatán recuperó el control de las acciones en el tercer mapa, Arbustos Frondosos, imponiéndose dos a uno en un duelo muy disputado, y finalmente cerró el campeonato en el mapa Doble Swoosh con un categórico dos a cero.",
                    "A nivel individual, el jugador Taikisha fue reconocido como la figura más destacada del evento por su brillante rendimiento a lo largo de las partidas, recibiendo una bonificación especial por su aporte al equipo.",
                    "Con estos resultados, la tabla general de posiciones quedó encabezada por Leviatán Esports en el primer lugar, escoltado por el subcampeón en la segunda casilla y cerrando el podio con el tercer puesto del torneo.",
                    "Agradecemos la participación de todos los competidores y les invitamos a mantenerse atentos a las próximas ediciones."
                ]
            },
            2: {
                tag: "Brawl Stars Oficial",
                title: "El sistema Camino Starr será reemplazado por una nueva mecánica llamada Brawler Blast",
                hero: "news/novedades2sep2.jpg",
                paragraphs: [
                    "El sistema Camino Starr será reemplazado por una nueva mecánica llamada Brawler Blast. Con este cambio, al reunir la cantidad de créditos requerida, se desbloqueará un personaje de manera aleatoria dentro de una determinada rareza, otorgando además progresión extra para dicho personaje.",
                    "Al conseguir los créditos necesarios, se abrirá una pantalla especial donde se mostrarán los personajes disponibles. Al tocar la pantalla, las opciones se irán eliminando una a una hasta revelar al personaje obtenido.",
                    "Cada descarte otorgará fragmentos de gemas que se convertirán directamente en mejoras para el personaje, como puntos de fuerza, gadgets, habilidades estelares, engranajes o hipercargas. Siempre se asegurará al menos un nivel de fuerza, con la posibilidad de obtener un personaje mejorado al máximo.",
                    "Cuando se añada un nuevo personaje al juego, este se sumará a la lista de su respectiva rareza y podrá aparecer en Brawler Blast, aunque no se podrá priorizar su desbloqueo inmediato.",
                    "Asimismo, el veintinueve de agosto se entregarán mil quinientos créditos como compensación por los ajustes en el sistema. Los jugadores podrán decidir si utilizar estos créditos antes de la actualización para conseguir el personaje que estén desbloqueando actualmente o guardarlos para el nuevo sistema aleatorio."
                ]
            }
        };

        const detailOverlay = document.getElementById("novedadDetail");
        const detailBack = document.getElementById("novedadDetailBack");
        const detailHero = document.getElementById("novedadDetailHero");
        const detailTag = document.getElementById("novedadDetailTag");
        const detailTitle = document.getElementById("novedadDetailTitle");
        const detailBody = document.getElementById("novedadDetailBody");

        function openDetail(index) {
            const data = NOVEDAD_DETAILS[index];
            if (!data) return;
            clearTimer(); // pausar el carrusel de novedades mientras se lee el detalle
            detailHero.src = data.hero;
            detailTag.textContent = data.tag;
            detailTitle.textContent = data.title;
            detailBody.innerHTML = data.paragraphs.map(p => `<p>${p}</p>`).join("");
            detailOverlay.classList.add("active");
            detailOverlay.scrollTop = 0;
            document.body.style.overflow = "hidden";
            zcPlaySound("entrar");
        }

        function closeDetail() {
            detailOverlay.classList.remove("active");
            document.body.style.overflow = "";
            zcPlaySound("salir");
            scheduleNext(); // reanudar el carrusel de novedades
        }

        document.querySelectorAll("[data-open-novedad]").forEach(el => {
            el.addEventListener("click", () => {
                const idx = parseInt(el.getAttribute("data-open-novedad"), 10);
                openDetail(idx);
            });
        });

        detailBack.addEventListener("click", closeDetail);
    })();
