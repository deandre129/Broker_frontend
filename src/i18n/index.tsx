import config from "@/config";

const i18n = {
  common: {
    cancel: "Cancel",
    comment: "Kommentare",
    content: "Content",
    toComment: "Kommentare Abgeben",
    edit: "Edit",
    email: "E-mail",
    name: "Name",
    no: "Nein",
    noCommit: "Keine Kommentare. Sei der Erste!",
    noReviews: (x) =>
      `Für ${x} wurden noch keine Bewertungen oder Erfahrungen erfasst. Seien Sie der Erste, der seine Erfahrungen über ${x} schreibt und bewerten Sie ${x} damit andere Benutzer sich ein besseres Bild über ${x} machen können.`,
    rating: "Bewertung",
    review: "Erfahrungsbericht",
    view: "View",
    writeReview: "Erfahrungsbericht schreiben",
    yes: "Ja",
  },

  app: {
    title: "broker-bewertungen.de",
  },

  entities: {
    blog: {
      title: "Blog",
    },

    contact: {
      fields: {
        name: "Name",
        email: "E-Mail",
        subject: "Betreff",
      },
    },

    blogComment: {
      create: {
        success: "Comment successfully saved",
      },
    },

    brokerPost: {
      create: {
        success: (x) =>
          `Vielen Dank für deine Bewertung von ${x}. Mit deiner Hilfe können so viele Trader die guten Broker schnell von den schlechteren unterscheiden und sich im besten Fall teures Lehrgeld sparen.\n
          Um sicherzugehen, dass es sich bei deiner Bewertung nicht um eine Fake Bewertung oder Eigenwerbung eines Brokers handelt und das Bewertungsbild so objektiv wie möglich bleibt, prüfen wir jede Bewertung erst, bevor wir diese veröffentlichen.\n
          Vielen Dank für deine Mithilfe!\n
          Dein Team von broker-bewertungen.de`,
        comment: "Post successfully saved",
      },
      fields: {
        id: "Id",
        idRange: "Id #",
        name: "Name",
        deleted: "Deleted",
        spam: "Spam",
        review_required: "Review Required",
        content: "Teasers",
        author: "Author",
        email: "Email",
        activated: "Activated",
        broker: "Broker",
        created: "Created At",
        rating: "Bewertung",
        review: "Berichte",
      },
    },

    broker: {
      characteristics: {
        fields: {
          licensed_broker: "Lizensierter Broker",
          minimum_deposit: "Mindesteinlage",
          bonus: "Bonus",
          accounting_bank: "Kontoführende Bank",
          withholding_tax: "Abgeltungssteuer",
        },
        tooltip: {
          licensed_broker:
            "Verfügt der Broker über eine eigene Brokerlizenz oder handelt es sich um einen Introducing Broker. Bei IBs muss man sich bei Umstimmigkeiten immer mit der Muttergesellschaft an die man vermittelt wurde auseinander setzen",
          customer_funds_separated:
            "Bei einer Insolvenz des Brokers haben Gläubiger nur Zugriff auf das Firmenvermögen.Werden die Kundengelder getrennt vom Betriebsvermögen gehalten, sind diese bei einer Insolvenz des Brokers vor dem Zugriff der Gläubiger geschützt und können an Kunden zurück fließen",
          bonus:
            "Einige Broker bieten ihren Kunden Bonuszahlungen in Form von Willkommensbonus, Einzahlungsbonus oder ähnlichem an.",
          accounting_bank:
            "Auf welcher Bank und in welchem Land verwahrt der Broker die Gelder der Kunden",
          obligation_to_make_additional_payments:
            "Schließt ein Broker die Nachschusspflicht nicht ausdrücklich aus, ist es unter Umständen möglich mehr als seine eingezahlte Einlage zu verlieren, wenn das Konto aufgrund starker Kursschwankungen ins Minus gerät.Wir empfehlen, sich in diesem Fall noch einmal direkt beim jeweiligen Broker zu erkundigen",
        },
      },
      comparison: {
        title: "Tool zum Vergleich von Online Brokern",
        vsTitle: (x, y) => `${x} vs. ${y} im Forex- und CFD-Broker-Vergleich`,
        metaDescription:
          "Vergleichen Sie Forex- und CFD-Broker miteinander und finden Sie so den besten Broker für Ihre Bedürfnisse.",
        metaVsDescription: (x, y) =>
          `Vergleichen Sie ${x} und ${y} miteinander und finden Sie so den besten Broker für Ihre Bedürfnisse.`,
        description:
          "Mit unserem Broker Vergleichstool können Sie schnell und einfach alle bei uns gelisteten Forex und CFD Broker in allen Kategorien miteinander vergleichen.und so problemlos den Broker finden der für Sie am besten geeignet ist. Zudem finden Sie zu fast jedem Broker Erfahrungen und Bewertungen von Tradern, um ihnen die Auswahl noch weiter zu erleichtern.",
        selectBrokers: "Bitte auswählen",
        logo: "Logo",
        compare: "Broker vergleichen!",
        brokerA: "Broker",
        brokerB: "Broker",
        brokerType: "Broker-Typ",
        overallRating: "Gesamtbewertung",
        customerReviews: "Kundenbewertungen",
        links: "Links",
        brokerFeature: "Besonderheiten",
        scalping: "Scalping",
        region: {
          regulationAndDepositInsurance: "Regulierung und Einlagensicherung",
          profileAndContact: "Broker Profil und Kontakt",
          tradableMarketsAndProducts: (x, y) =>
            `Handelbare Märkte und Produkte bei ${x} und ${y}`,
          spreadsAndFees: (x, y) =>
            `Spreads und Gebührenvergleich von ${x} und ${y}`,
          tradingPlatforms: (x, y) => `Handelsplatformen bei ${x} und ${y}`,
          service: (x, y) => `Service bei ${x} und ${y}`,
        },
        single: {
          tradableMarketsAndFees: (x) =>
            `Handelbare Märkte und Gebühren bei ${x}`,
        },
        awards: "Aus-zeichnungen",
        regulation: "Regulierung",
        tooltip: {
          regulation:
            "Von welcher Aufsichtsbehörde wird der Broker reguliert und überwacht ? Wir empfehlen nur bei Brokern zu handeln, die entweder von der BaFin, der FCA oder der CySEC reguliert werden.",
          depositProtection:
            "Die Einlagensicherung gibt an, bis zu welchem Betrag ihre Einlagen im Falle einer Insolvenz des Brokers geschützt sind.",
        },
        depositProtection: "Einlagen-sicherung",
        profile: "Broker-Profil",
        address: "Anschrift",
        contact: "Kontakt",
        contacts: {
          phone: "Telefon",
          fax: "Fax",
          email: "E-Mail",
        },
        checkbox: {
          name: {
            TRADE_PLATFORM: "Handelsplatformen",
            FREE_DEMO_ACCOUNT: "Kostenloses Demokonto",
            METATRADER_4: "MetaTrader 4",
            METATRADER_5: "MetaTrader 5",
            WEB_PLATFORM: "Web Platform",
            MOBILE_TRADING_APPS: "Mobile Trading Apps",
            HEDGING_ALLOWED: "Hedging möglich",
            ADDITIONAL_TRADE_TOOLS: "zusätzliche Tools für den Handel",
            AUTOMATED_TRADE_POSSIBLE: "automatisierter Handel Möglich",
            API_INTERFACES: "API Schnittstellen",
            RATE_ALARMS: "Kursarlarme per SMS oder E-Mail",
            PLATFORM_TUTORIALS: "Anleitungen zur Trading Platform",
            LAYOUT_SAVEABLE: "Layout speicherbar",
            ONE_CLICK_TRADING: "One Click Trading",
            TRADE_FROM_CHART: "Handeln aus dem Chart",
            ALL_POSITIONS_CLOSEABLE: "Alle Positionen auf einmal schließbar",
            GUARANTEED_STOPS: "Garantierte Stops und Limit möglich",
            PHONE_TRADE_POSSIBLE: "Telefonischer Handel möglich",
            COMMISSIONS: "Kommissionen",
            IMPORTANT_MARKET_SPREADS: "Spreads der wichtigsten Märkte",
            COST_FOR_OVERNIGHT: "Finanzierungsposten für Übernachtpositionen",
            FEES_FOR_DEPOSIT_DISBURSAL:
              "Gebühren für Einzahlungen und Auszahlungen",
            FREE_ORDERCHANGE: "Kostenlose Orderänderungen oder Stornierungen",
            FREE_DEPOT: "Depotführung kostenlos",
            NO_PLATFORM_FEES: "keine Gebühren für Plattform",
            GERMAN_SUPPORT: "Deutscher Support",
            CONTACT: "Kontaktmöglichkeiten",
            DAILY_TRADE_HELP: "Tägliche Handelsunterstützungen",
            GERMAN_WEBINAR: "Regelmäßige Webinare auf Deutsch verfügbar",
            GERMAN_SEMINAR: "Regelmäßige Seminare verfügbar",
            COACHINGS_AVAILABLE: "Einzelcoachings verfügbar",
            KNOWLEDGE_BASE: "Umfangreicher Wissensbereich",
            TRADEABLE_MARKETS: "Handelbare Märkte",
            MARGIN: "Hebel/Margin",
            SOCIAL_TRADING: "Social Trading",
            MANAGED_ACCOUNTS: "Managed Accounts",
            INSTANT_EXECUTION: "Instant Execution (keine Requotes)",
            POSITIVE_SLIPPAGE_POSSIBLE: "positive Slippage möglich",
            ECN_ORDER_EXECUTION: "ECN Orderausführung",
            LIQUIDITY_PRODIVER: "Liquiditätsprovider",
            MICRO_LOTS: "Mini- oder MicroLots möglich",
            INDEX_CFD_TRADEABLE_BELOW_POINT:
              "Index-CFDs ab 1 € oder weniger pro Punkt handelbar",
            RATE_SWITCH_24_5_INDEX_CFD: "24/5 Kursstellung bei Index-CFDs",
            NO_FINANCIAL_COST_INDEX_CFD:
              "keine Finanzierungskosten auf Index-CFDs",
            NO_FINANCIAL_COST_RAW_MATERIAL_CFD:
              "keine Finanzierungskosten auf Rohstoff-CFDs",
            CFD_CONTRACTS_AUTOMATIC_ROLL:
              "CFD Kontrakte werden automatisch gerollt",
            REAL_STOCKS_CFD_SPREADS: "Börsenechte Aktien CFD Spreads",
            DMA_STOCKS: "DMA Aktien CFDs",
            MINIMAL_ORDERSIZE_STOCKS: "Minimale Ordergröße Aktien CFDs",
            COMPANY: "Unternehmen",
            OFFICE_IN_GERMANY: "Büro in Deutschland",
            BONUS: "Bonus",
            REGULATION_AND_DEPOSIT_SECURITY:
              "Regulierung und Einlagensicherung",
            RESERVE_LIABILIRY: "Nachschusspflicht",
            INTEREST_ON_DEPOSIT: "Zinsen auf Kontoeinlage",
            WITHOLDING_TAX: "Abgeltungssteuer",
            SEGREGATED_ACCOUNTS: "Kundengelder getrennt (segregated Accounts)",
            ACCOUNT_CURRENCIES: "Währungen für Kontoführung",
            POSIBILITIES_FOR_WITHDRAWALS:
              "Möglichkeiten für Einzahlungen und Auszahlungen",
          },
          tooltip: {
            BONUS:
              "Einige Broker bieten ihren Kunden Bonuszahlungen in Form von Willkommensbonus, Einzahlungsbonus oder ähnlichem an.",
            RESERVE_LIABILIRY:
              "Schließt ein Broker die Nachschusspflicht nicht ausdrücklich aus, ist es unter Umständen möglich mehr als seine eingezahlte Einlage zu verlieren, wenn das Konto aufgrund starker Kursschwankungen ins Minus gerät.Wir empfehlen, sich in diesem Fall noch einmal direkt beim jeweiligen Broker zu erkundigen",
            SEGREGATED_ACCOUNTS:
              "Bei einer Insolvenz des Brokers haben Gläubiger nur Zugriff auf das Firmenvermögen.Werden die Kundengelder getrennt vom Betriebsvermögen gehalten, sind diese bei einer Insolvenz des Brokers vor dem Zugriff der Gläubiger geschützt und können an Kunden zurück fließen",
            HEDGING_ALLOWED:
              "Hedging beispielsweise im MetaTrader erlaubt es Kunden in einem Konto im gleichen Markt gleichzeitig sowohl Long als auch Short Positionen eröffnen zu können.",
            SOCIAL_TRADING:
              'Einige Broker ermöglichen das Kopieren der Trades anderer Kunden.In der Regel kann man sich Statistiken zur Handelsaktivität und die Performance der anderern Trader ansehen und auf Wunsch die Trades dieser Trader auf das eigene Handelskonto "spiegeln". In der Regel werden die Positionsgrößen dann prozentual auf das eigene Kapital angepasst, so dass das Risiko und Moneymanagement von Signalgeber und Signalnehmer in etwa gleich bleibt.',
            MANAGED_ACCOUNTS:
              "Managed Accounts sind Konten, bei denen dritte ihr Kapital für Sie verwalten und anlegen.Der Verwalter verfügt über eine Vollmacht desKunden durch eigenständigen Handel Gewinne im Auftrag des Kunden zu erzielen.Im Regelfall fällt dafür eine geringe Grundgebühr und eine Beteiligung an den erzieten Gewinnen an.",
            INSTANT_EXECUTION:
              "Requotes sind Preisvorschläge des Brokers die Sie erhalten, wenn der von ihnen gewünschte Kurs sich während dem Absenden der Order bei ihnen und dem Eintreffen beim Broker geändert hat.Diesen Preisvorschlag können Sie akzeptieren oder ablehnen. Bei Instant Execution dürfen Requotes nicht vorkommen.",
            ECN_ORDER_EXECUTION:
              "Bei ECN/STP Brokern werden die Orders im Gegensatz zu Market-Makern nicht von einem Dealing Desk bearbeitet, sondern direkt an den Interbankenmarkt weitergeleitet.Das Resultat sind häufig schnellere Orderausführungen und bessere Spreads.Jedoch wird hier meist zusätzlich zum Spread noch eine Ordergebühr fällig.",
            LIQUIDITY_PRODIVER:
              "An welche Liquiditätsprovider (LPs) werden die Orders zu 100% weitergeleitet",
            INDEX_CFD_TRADEABLE_BELOW_POINT:
              "Kann der DAX30 Index mit 1 Euro oder weniger pro Punkt gehandelt werden ?",
            RATE_SWITCH_24_5_INDEX_CFD:
              "Einige Broker bieten die Möglichkeit auch nach Handelsschluss noch Orders zu platzieren.Meist werden hier die Spreads erweitert aber ein ausserbörslicher Handel ist möglich, um auf eventuelle Nachrichten reagieren zu können.",
            NO_FINANCIAL_COST_INDEX_CFD:
              "Einige Broker bieten ihren Kunden die Möglichkeit Positionen in Index-CFDs über Nacht zu halten ohne dafür Finanzierungskosten zahlen zu müssen",
            NO_FINANCIAL_COST_RAW_MATERIAL_CFD:
              "Einige Broker bieten ihren Kunden die Möglichkeit Positionen in Rohstoff-CFDs über Nacht zu halten ohne dafür Finanzierungskosten zahlen zu müssen",
            REAL_STOCKS_CFD_SPREADS:
              "Börsenechte 1:1 Spreads sind so ziemlich das Optimum für den Aktien-CFD handel, da diese eine faire Orderausführung und weitere Kosten erlauben.",
            DMA_STOCKS:
              "DMA (Direct Market Access) bedeutet Sie erhalten direkten Marktzugang zu den wichtigsten Börsen der Welt und können so die klassischen Vorteile des CFD Handels, wie den Handel auf Margin mit Hebelwirkung nutzen, wobei ihre Orders dennoch wie beim Handel von echten Aktien direkt an der jeweiligen Börse ausgeführt werden",
            ALL_POSITIONS_CLOSEABLE:
              "Die Handelsplattform erlaubt dass Schließen aller Positionen zum gleichen Zeitpunkt.",
          },
        },
      },
      market: {
        title: (x) => `Handelbare Märkte und Gebühren bei ${x}`,
        forex_trading_at_activities: (x) => `Forex Trading bei ${x}`,
        cfd_trading_at_activTrades: (x) => `CFD Trading bei ${x}`,
      },
      platform: {
        title: (x) => `Handelsplattformen von ${x}`,
        order_options: "order options",
        order_types: "Ordertypen",
      },
      spread: {
        title: (x) => `Spreads bei ${x}`,
      },
      service: {
        title: (x) => `Service bei ${x}`,
        homepage: "Homepage",
        contact: "Kontakt",
        address: "Anschrift",
        training_opportunities: "Weiterbildungsmöglichkeiten",
      },
      fields: {
        // #region Broker
        name: "Name",
        // #endregion

        // #region Broker's Categories
        categories: "Categories",
        categories_in_top_lists: "Show in top lists of these categories",
        // #endregion

        // #region Broker Metadata
        broker_type: "Broker-Typ",
        minimum_deposit: "Mindesteinlage",
        scalping_allowed: "Scalping erlaubt",
        // #endregion

        // #region Regulatory Authority
        regulation: "Regulierung",
        // #endregion

        // #region Deposit Guarantee
        deposit_guarantees: "Einlagensicherung",
        // #endregion

        // #region Certificate
        certificates: "Auszeichnungen",
        // #endregion

        // #region Spread
        spreads: "Spreads",
        // #endregion

        // #region particularities
        specialties: "Besonderheiten",
        // #endregion
      },
      tabs: {
        broker: "Broker",
        overview: "Broker Übersicht",
        characteristics: "Steckbrief",
        platform: "Plattform",
        markets: "Märkte",
        spreads: "Spreads",
        service: "Service",
        test: "Test",
        old: "Old",
        articles: "Articles",
        forexSignal: "Forex Signal",
      },
      enumerators: {
        meta: {
          broker_type: {
            ECN: "ECN Broker",
            MT4: "MetaTrader Broker",
            MM: "Market Maker",
            ECN_AND_MT4: "ECN Broker (MT4)",
            MM_AND_MT4: "Market Maker (MT4)",
            DMA: "DMA Broker",
            STP: "STP Broker",
            STP_AND_MT4: "STP Broker (MT4)",
            MARKET_MAKER_AND_STP: "Market Maker / STP Broker",
            BITCOIN_EXCHANGE: "Exchange for bitcoin and cryptocurrencies",
          },
          withholding_tax: {
            WITHHOLDING_TAX_1: "Withheld directly by the broker",
            WITHHOLDING_TAX_2: "Muss vom Kunden selbst abgeführt werden",
          },
        },
      },
      text: {
        activeTraderExperience: "ActivTrade's trader experiences",
        introduction: "Broker Vorstellung",
        freeDemoAccount: "kostenloses Demokonto",
        nowTo: (x) => `Weiter zu ${x}`,
        shareYourExperience: "Deine Erfahrungen teilen",
        portrait: "Portrait",
        rating: (x, y, z) =>
          `${x} von ${y} Punkten aus ${z} Bewertungen von Tradern`,
        upsides: "Fazit aus Trader Bewertungen",
        video: "Broker Vorstellung",
        broker_comparison: "Broker Comparison",
        broker_comparison_teaser:
          "Den besten Broker zu finden ist nicht immer leicht. Auf Broker-Bewertungen.de finden Sie einen Vergleich aller großen Broker sortiert nach Broker Typ, Regulierung, Trading Plattform und Einzahlungsmethoden. Dabei finden Sie zu jedem Broker User Bewertungen von echten Tradern, um ihnen die Suche zu erleichtern.",
      },
    },

    brokerArticle: {
      name: "brokerArticle",
      label: "All Broker Articles",
      menu: "Broker Articles",
      exporterFileName: "brokerArticle_export",
      list: {
        menu: "Broker Articles",
        title: "Broker Articles",
      },
      create: {
        success: "Broker Article successfully saved",
      },
      update: {
        success: "Broker Article successfully saved",
      },
      destroy: {
        success: "Broker Article successfully deleted",
      },
      destroyAll: {
        success: "Broker Article(s) successfully deleted",
      },
      edit: {
        title: "Edit Broker Article",
      },
      fields: {
        id: "Id",
        idRange: "Id #",
        name: "Name",
        name_normalized: "Link",
        pagetitle: "Page Title",
        metadescription: "Meta Description",
        metakeywords: "Meta Keywords",
        activated: "Activated",
        content: "Content",
        author: "Author",
      },
      enumerators: {
        target: {
          _blank: "New Window",
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: "New Broker Article",
      },
      view: {
        title: "View Broker Article",
      },
      importer: {
        title: "Import Broker Articles",
        fileName: "brokerArticle_import_template",
        hint: "Files/Images columns must be the URLs of the files separated by space.",
      },
    },

    category: {
      placeholders: {
        description: (x) =>
          `<p> Den besten ${x} zu finden ist nicht immer leicht.<br />Auf Broker-Bewertungen.de finden Sie einen Vergleich aller großen {0} sortiert nach Broker Typ, Regulierung, Trading Plattform und Einzahlungsmethoden.<br />Dabei finden Sie zu jedem Broker User Bewertungen von echten Tradern, um ihnen die Suche zu erleichtern.</p>`,
      },
    },

    home: {
      title: "Broker Bewertungen von Tradern für Trader",
      subtitle:
        "Mit bereits über 8000 Erfahrungsberichten & Bewertungen von Tradern sind wir das größte deutschsprachige Vergleichsportal für Online Broker und Trading Services - seit 2009!",
      description:
        "Wir sind selbst Trader und wissen wie schwer es ist einen guten Broker für den Handel von Forex, CFDs, Aktien, Futures oder Binären Optionen zu finden.Deshalb haben wir diese Seite ins Leben gerufen und alle Informationen zu den bekanntesten Brokern übersichtlich für unsere Besucher zusammengefasst.",
      top_brokers: "Von Tradern am besten bewertete Broker",
      top_brokers_description:
        "Zusätzlich zu Handelsplattform, Spreads und Co. finden Sie in unserem Broker Vergleich auch Erfahrungsberichte von Tradern zu fast jedem Anbieter, um ihnen die Suche nach dem richtigen Anbieter etwas zu erleichtern und die guten Broker von den mittelmäßigen zu unterscheiden.",
      forex_broker: "Forex Broker Vergleich",
      cfd_broker: "CFD Broker Vergleich",
      cfd_broker_content:
        "Vergleichen Sie alle grossen CFD Broker miteinander und lesen Sie Erfahrungsberichte von Tradern zu jedem Broker",
      forex_broker_content:
        "Finden Sie informationen zu allen grossen Forex Brokern inklusive Erfahrungen und Bewertungen von Tradern",
      why_broker_comparison: "Warum einen Broker Vergleich machen ?",
      why_broker_comparison_content:
        "In der heutigen Zeit entscheiden sich immer mehr spekulativ eingestellte Trader inzwischen für den Handel&nbsp; mit Devisen, CFDs oder anderen Finanzinstrumenten. Dabei ist der Start nicht immer ganz einfach, da es in Vorfeld zahlreiche Informationen gibt, die zuvor gesammelt werden müssen. Dazu gehört auch, dass sich der Trader mit der Frage beschäftigt, über welchen Anbieter er überhaupt Devisen, CFDs und andere Finanzprodukte handeln möchte. Selten ist es nämlich die Hausbank oder eine Direktbank, die solche Handelsmöglichkeiten im Angebot hat. Stattdessen sind es spezielle Forex- und CFD-Broker, die Anlegern den Zugang zu diesen Anlageformen anbieten. Daher sollte jeder Trader und solche die es noch werden wollen sich mit der Frage auseinander setzen, wie er den für sich beten Broker finden kann. Diese Aufgabe lässt sich am einfachsten durch einen ausführlichen <strong>Broker Vergleich</strong> bewältigen.",
      find_right_broker:
        "Durch einen Broker Vergleich den richtigen Broker finden",
      find_right_broker_content: `Wir sind selbst Trader und wissen daher wie schwierig es sein kann einen guten und seriösen Broker für den CFD-&nbsp; , <a href="${config.frontendUrl.protocol}://${config.frontendUrl.host}/aktien-broker-vergleich"><strong>Aktien</strong></a> oder <strong><a href="${config.frontendUrl.protocol}://${config.frontendUrl.host}/forex-broker-vergleich">Forex Broker</a></strong> zu finden.Auf&nbsp; broker-bewertungen.de bieten wir die Möglichkeit, den für Sie richtigen Broker einfach und schnell anhand von zahlreichen Kriterien zu ermitteln. Zu diesem Zweck stellen wir Ihnen einen umfangreichen Forex- und <strong><a href="${config.frontendUrl.protocol}://${config.frontendUrl.host}/cfd-broker-vergleich">CFD-Broker Vergleich</a></strong> zur Verfügung. Dabei handelt es sich nicht nur um einen reinen Konditionenvergleich. Neben den Handelskonditionen spielen bei uns vor allem die Bewertungen von Kunden zu den jeweiligen Anbietern eine Rolle.Egal ob Forex Broker, CFD Broker, Aktien Broker oder Signalservice, in unserer Datenbank finden Sie wahrscheinlich Bewertungen von Kunden zu fast jedem Anbieter. Dabei können Sie als Trader von diesen Empfehlungen, Erfahrungsberichten und auch von den Meinungen anderer profitieren und in ihren Broker Vergleich mit einfließen lassen. Deshalb stellen diese Informationen sicherlich eine wichtige Hilfe dar, damit auch Sie den richtigen Broker finden können. Unabhängig davon, ob Sie unsere Broker Vergleiche nutzen oder sich anderweitig informieren möchten, sollten Sie beim Gegenüberstellen der Anbieter diverse Punkte beachten. Sicherlich ist es an dieser Stelle hilfreich, dass Sie bereits einige <strong><a href="${config.frontendUrl.protocol}://${config.frontendUrl.host}/forex-schule">Grundkenntnisse</a></strong> haben, wodurch sich die Broker unterscheiden, auf welche Merkmale zu achten ist und was einen guten Anbieter von einem mittelmäßigen oder sogar schlechten Broker unterscheidet.`,
      pay_attention_to_various:
        "Achten Sie beim Broker Vergleich auf diverse Kriterien",
      pay_attention_to_various_content:
        "Im Folgenden möchten wir etwas näher darauf eingehen, worauf Sie bei einem Broker Vergleich achten sollten und welche Kriterien sowie Merkmale von Bedeutung sind. Unter anderem sollten Sie sich in diesem Zusammenhang einige der folgenden Fragen stellen:",
      what_trading_broker_offer: "",
    },
  },

  auth: {
    contactSuccess: `Contact email successfully sent`,
  },

  errors: {
    backToHome: "Back to home",
    403: `Sorry, you don't have access to this page`,
    404: "Sorry, the page you visited does not exist",
    500: "Sorry, the server is reporting an error",
  },

  // See https://github.com/jquense/yup#using-a-custom-locale-dictionary
  table: {
    noData: "No records found",
  },

  pagination: {
    labelDisplayedRows: (x, y, z) => `${x}-${y} von ${z}`,
  },

  footer: {
    description: (x) =>
      `CFD sind komplexe Instrumente und gehen wegen der Hebelwirkung mit dem hohen Risiko einher, schnell Geld zu verlieren. Zwischen 74 % und 89 % der Kleinanlegerkonten verlieren beim Handel mit CFD Geld. Sie sollten überlegen, ob Sie verstehen, wie CFD funktionieren und ob Sie es sich leisten können, das hohe Risiko einzugehen, Ihr Geld zu verlieren.Informieren Sie sich vor der Kontoeröffnung bei einem Forex-Broker, CFD-Broker, ECN / STP Broker, Metatrader Broker oder vor dem Kauf eines Expert-Advisors in unserer Datenbanküber Erfahrungen und Bewertungen anderer Trader, lesen Sie die dazugehörigen Erfahrungsberichte und machen Sie einen Forex-Broker Vergleich. Helfen Sie anderen Nutzern beim Vergleich der gelisteten Forex-Broker und teilen Sie ihre bisherigen Erfahrungen auf ${x} und schreiben Sie einen Erfahrungsbericht. Das Ranking der Broker basiert auf den abgegebenen Kundenbewertungen.`,
  },
};

export default i18n;
