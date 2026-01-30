export type Locale = 'fa' | 'en' | 'ru'

type MessageValue = string | { [key: string]: MessageValue }

type Messages = Record<Locale, MessageValue>

export const messages: Messages = {
  fa: {
    brand: {
      name: 'صنایع پخت مشهد'
    },
    shared: {
      phoneDisplay: '۰۵۱-۳۲۴۶۴۰۹۰'
    },
    seo: {
      site: {
        title: 'صنایع پخت مشهد | MBICO',
        description: 'بزرگترین سازنده دستگاه‌های نانوایی، قنادی و ماشین‌آلات پخت'
      },
      products: {
        title: 'محصولات | MBICO',
        description: 'لیست محصولات صنایع پخت مشهد'
      },
      categories: {
        title: 'دسته‌بندی‌ها | MBICO',
        description: 'مرور دسته‌بندی محصولات.'
      },
      categoryDetail: {
        titleFallback: 'دسته‌بندی | MBICO',
        descriptionFallback: 'مرور محصولات این دسته‌بندی.'
      },
      blog: {
        title: 'وبلاگ | MBICO',
        description: 'اخبار و مقالات صنایع پخت مشهد'
      },
      news: {
        title: 'اخبار',
        description: 'آخرین اخبار'
      },
      contact: {
        title: 'تماس با ما',
        description: 'راه‌های ارتباطی'
      },
      about: {
        title: 'درباره ما',
        description: 'اطلاعات درباره مجموعه'
      },
      academy: {
        title: 'آکادمی پخت',
        description: 'آموزش‌ها و مقالات'
      },
      afterSales: {
        title: 'خدمات پس از فروش',
        description: 'پشتیبانی و خدمات'
      },
      blogPost: {
        titleFallback: 'وبلاگ',
        descriptionFallback: 'مقاله'
      },
      productDetail: {
        titleFallback: 'محصولات | MBICO',
        descriptionFallback: 'جزئیات محصول صنایع پخت مشهد'
      }
    },
    header: {
      links: {
        home: 'خانه',
        products: 'محصولات',
        categories: 'دسته‌بندی‌ها',
        about: 'درباره ما',
        contact: 'تماس با ما',
        blog: 'وبلاگ'
      },
      mega: {
        categoriesLabel: 'دسته‌بندی‌ها',
        viewAll: 'مشاهده همه',
        fallbackCategory: 'دسته‌بندی',
        tabs: {
          ovens: {
            label: 'فرهای پخت',
            items: {
              bakery: 'دستگاه‌های نانوایی',
              bulk: 'فرهای پخت نان حجیم و نیمه‌حجیم',
              pizza: 'فرهای پخت پیتزا و غذا',
              lavash: 'دستگاه لواش',
              barbari: 'دستگاه بربری',
              sangak: 'دستگاه سنگک',
              taftoon: 'دستگاه تافتون'
            }
          },
          equipment: {
            label: 'تجهیزات پخت',
            items: {
              viewAll: 'مشاهده همه تجهیزات پخت',
              products: 'محصولات',
              afterSales: 'خدمات پس از فروش'
            }
          },
          mobile: {
            label: 'ماشین‌آلات پخت سیار',
            items: {
              viewAll: 'مشاهده همه ماشین‌آلات پخت سیار',
              products: 'محصولات'
            }
          }
        }
      },
      cta: {
        phone: 'تماس: ۰۵۱-۳۲۴۶۳۰۸۰',
        phoneShort: 'تماس: 051-32464090'
      },
      aria: {
        openMenu: 'باز کردن منو',
        closeMenu: 'بستن منو',
        close: 'بستن'
      },
      language: {
        label: 'زبان',
        fa: 'فارسی',
        en: 'English',
        ru: 'Русский'
      }
    },
    footer: {
      heroAlt: 'نمای کارخانه صنایع پخت مشهد',
      tagline: 'نان سالم، هوای پاک، ایران سرافراز',
      description: 'شرکت صنایع پخت مشهد با رویکرد توسعه پایدار، در تلاش است با ارائه راهکارهای نوآورانه در صنعت پخت، کیفیت زندگی و بهره‌وری را ارتقا دهد.',
      quickAccess: 'دسترسی سریع',
      links: {
        products: 'محصولات',
        blog: 'وبلاگ',
        afterSales: 'خدمات پس از فروش',
        contact: 'تماس با ما'
      },
      contactHeading: 'ارتباط با ما',
      labels: {
        phone: 'تلفن',
        website: 'وب‌سایت',
        email: 'ایمیل'
      },
      copyright: '© {{year}} صنایع پخت مشهد'
    },
    home: {
      hero: {
        alt: 'شرکت بین المللی صنایع پخت مشهد'
      },
      productCategories: {
        heading: 'دسته بندی محصولات',
        items: {
          ovens: 'فرهای پخت',
          equipment: 'تجهیزات پخت',
          mobile: 'ماشین آلات سیار پخت'
        }
      },
      ovenCategories: {
        heading: 'گروه‌های اصلی محصولات',
        items: {
          bakery: 'دستگاه نانوایی',
          lavash: 'دستگاه لواش',
          barbari: 'دستگاه بربری',
          taftoon: 'دستگاه تافتون',
          sangak: 'دستگاه سنگک'
        },
        counts: {
          bakery: '۹ محصول',
          lavash: '۷ محصول',
          barbari: '۶ محصول',
          taftoon: '۶ محصول',
          sangak: '۹ محصول'
        }
      },
      services: {
        title: 'صادرات به ۴۷ کشور دنیا',
        text: 'شرکت صنایع پخت مشهد، به‌عنوان اولین شرکت دانش‌بنیان در زمینه طراحی و تولید ماشین‌آلات پخت نان، شیرینی و کانتینرهای سیار پخت، با تمرکز بر کیفیت، بهره‌وری و خدمات پس از فروش، حضور خود را در عرصه بین‌المللی گسترش داده است.',
        stats: {
          b2b: 'پروژه‌های صنعتی',
          qc: 'کنترل کیفیت',
          sla: 'پشتیبانی'
        },
        imageAlt: 'صادرات ۴۷'
      },
      featured: {
        heading: 'محصولات منتخب؛ راهکاری حرفه‌ای برای نیازهای شما',
        cta: 'افزودن به سبد خرید',
        fallbackProducts: {
          portableRotary: 'دستگاه نانوایی دوار پرتابل',
          sangakAuto: 'دستگاه نانوایی سنگک اتومات پرتابل',
          tunnel: 'دستگاه نانوایی تونلی',
          rotaryPastry: 'فر گردان قنادی و فانتزی'
        }
      },
      certificates: {
        title: 'گواهینامه ها و استانداردها',
        subtitle: 'Certificates & standards',
        description: 'محصولات شرکت صنایع پخت مشهد با رعایت ۶ استاندارد معتبر جهانی، تضمینی برای کیفیت، ایمنی و بهره‌وری بالا در صنعت پخت نان، شیرینی و غذا هستند. این استانداردها نشان‌دهنده تعهد ما به اصول مهندسی دقیق، مواد اولیه باکیفیت و فرآیندهای تولید پیشرفته است. همچنین، دریافت نشان Eco Energy تأکیدی بر رویکرد ما به بهره‌وری انرژی و حفاظت از محیط زیست می‌باشد.',
        items: {
          ce: 'CE اروپا',
          gost: 'گاست روسیه',
          csa: 'CSA کانادا',
          eco: 'نشان اکو انرژی',
          ul: 'UL کانادا',
          iso: 'ایزو 9001',
          iran: 'استاندارد ملی ایران'
        }
      },
      blogSection: {
        title: 'جدیدترین اخبار و مقالات',
        text: 'همواره در جریان آخرین اخبار و رویدادهای مهم ما باشید. با ما به روز بمانید!',
        button: 'وبلاگ ما',
        error: 'بارگذاری مقالات با خطا مواجه شد.',
        empty: 'هنوز مقاله‌ای برای نمایش وجود ندارد.'
      },
      videoTeaser: {
        alt: 'تیزر معرفی صنایع پخت مشهد',
        title: 'تیزر معرفی صنایع پخت مشهد',
        text: 'با ما همراه باشید و از نزدیک با محصولات و خدمات آشنا شوید.',
        playAria: 'پخش ویدئو',
        closeAria: 'بستن',
        modalTitle: 'پخش ویدئو'
      }
    },
    products: {
      list: {
        title: 'محصولات صنایع پخت مشهد',
        error: 'دریافت محصولات با خطا مواجه شد. لطفاً دوباره تلاش کنید.',
        empty: 'محصولی برای نمایش وجود ندارد.',
        priceFallback: 'تماس بگیرید',
        cta: 'افزودن به سبد خرید',
        allTitle: 'محصولات'
      },
      sections: {
        ovens: 'فرهای پخت',
        breadOvens: 'دستگاه های پخت نان',
        autoBreadOvens: 'دستگاه های اتوماتیک پخت نان',
        doughPrep: 'تجهیزات آماده سازی خمیر و مواد اولیه',
        doughForming: 'تجهیزات فرم دهی خمیر و سیستم های تخمیر',
        cooling: 'سیستم های خنک کننده',
        accessories: 'تجهیزات جانبی'
      }
    },
    productDetail: {
      fallbackNav: {
        intro: 'معرفی محصول',
        specs: 'مشخصات فنی',
        video: 'ویدیو محصول',
        faq: 'سوالات متداول'
      },
      catalogLabel: 'کاتالوگ',
      noDetails: 'جزئیات این محصول به زودی تکمیل می‌شود.',
      fullDescription: 'توضیحات کامل',
      loading: 'در حال دریافت اطلاعات محصول...',
      error: 'دریافت اطلاعات محصول با خطا مواجه شد. دوباره تلاش کنید.',
      downloadCatalog: 'دانلود کاتالوگ',
      specTable: {
        title: 'مدل ها و مشخصات فنی',
        rowLabel: 'مشخصات'
      },
      callToBuy: {
        title: 'برای خرید و مشاوره تماس بگیرید',
        description: 'کارشناسان فروش آماده پاسخ گویی و ثبت سفارش هستند.',
        primary: 'تماس مستقیم',
        secondary: 'فرم تماس'
      },
      related: {
        title: 'محصولات مرتبط'
      },
      video: {
        prev: 'ویدیو قبلی',
        next: 'ویدیو بعدی',
        play: 'پخش ویدیو',
        close: 'بستن ویدیو',
        goTo: 'رفتن به ویدیو {{index}}'
      }
    },
    categories: {
      list: {
        error: 'در حال حاضر امکان دریافت دسته‌بندی‌ها وجود ندارد. لطفاً دوباره تلاش کنید.',
        empty: 'دسته‌بندی‌ای برای نمایش وجود ندارد.',
        noImage: 'بدون تصویر',
        fallbackTitle: 'دسته‌بندی‌ها'
      },
      detail: {
        label: 'دسته‌بندی',
        emptyDescription: 'جزئیات این دسته‌بندی به‌زودی تکمیل می‌شود.',
        viewProducts: 'مشاهده محصولات',
        allCategories: 'همه دسته‌بندی‌ها',
        error: 'جزئیات دسته‌بندی دریافت نشد؛ فهرست محصولات نمایش داده می‌شود.',
        loading: 'در حال دریافت اطلاعات دسته‌بندی...',
        noImage: 'تصویری موجود نیست',
        productsTitle: 'محصولات این دسته‌بندی',
        productsCount: '{{count}} مورد',
        productsError: 'در حال حاضر امکان دریافت محصولات وجود ندارد. لطفاً دوباره تلاش کنید.',
        productsEmpty: 'هنوز محصولی در این دسته‌بندی ثبت نشده است.',
        priceFallback: 'استعلام قیمت',
        viewDetails: 'مشاهده جزئیات'
      }
    },
    blog: {
      list: {
        heroLabel: 'وبلاگ تخصصی',
        heroTitle: 'صنایع پخت مشهد',
        heroSubtitle: 'تازه ترین خبرها، مقالات و نکات فنی درباره خط تولید، تجهیزات و تکنولوژی های پخت.',
        introTitle: '✨ 🌿 به وبلاگ تخصصی صنایع پخت مشهد خوش آمدید!',
        introParagraph1: 'در اینجا، دنیای نان و شیرینی را از زاویه‌ای متفاوت می‌بینید؛ جایی که علم، هنر و تجربه در هم می‌آمیزند تا طعمی بی‌نظیر خلق شود.',
        introParagraph2: 'در این وبلاگ، دانستنی‌های آرد، نانوایی و قنادی، نکات کاربردی پخت و هرآنچه که برای پخت حرفه‌ای نیاز دارید را با شما به اشتراک می‌گذاریم.',
        introNote: 'همراه ما باشید تا با هم، لذت پختی بی‌نقص را تجربه کنیم! 🥖 🎂',
        relatedTitle: 'مقالات مرتبط',
        error: 'دریافت مطالب وبلاگ با خطا مواجه شد.',
        empty: 'مطلبی برای نمایش وجود ندارد.'
      },
      detail: {
        metaDate: 'نوشته شده در تاریخ {{date}}',
        metaAuthor: 'توسط {{author}}',
        back: 'بازگشت',
        backToBlog: 'بازگشت به وبلاگ',
        error: 'دریافت مقاله با خطا مواجه شد.'
      }
    },
    pages: {
      news: {
        heading: 'اخبار',
        body: 'بخش اخبار در حال آماده‌سازی است.'
      },
      academy: {
        heading: 'آکادمی پخت',
        body: 'محتوای آکادمی به‌زودی اضافه می‌شود.'
      },
      about: {
        heading: 'درباره ما',
        nav: {
          company: 'معرفی شرکت',
          history: 'تاریخچه',
          honors: 'افتخارات',
          gallery: 'گالری'
        },
        heroAlt: 'درباره صنایع پخت مشهد',
        intro: {
          title: 'معرفی صنایع پخت مشهد',
          paragraph1: 'شرکت صنایع پخت مشهد در سال ۱۳۷۰ با هدف ساخت انواع دستگاه‌های نانوایی، ماشین‌آلات و تجهیزات پخت نان و شیرینی جهت تأمین نیازهای داخلی و حضور در بازارهای جهانی، تحت شماره ۷۵۷۱ در اداره کل ثبت شرکت‌های خراسان به ثبت رسید و فعالیت خود را در زمینی به وسعت بیش از ۵۰,۰۰۰ متر مربع آغاز نمود. با توجه به کیفیت بالا در طراحی و زیبایی ظاهری، محصولات شرکت صنایع پخت مشهد از توجه خاصی در بین هموطنان برخوردار می‌باشد به گونه‌ای که دستگاه‌های نانوایی این شرکت در تمام شهرهای ایران به عنوان بهترین دستگاه‌های نانوایی شناخته می‌شوند و برای بهبود بهره‌وری مورد استفاده قرار می‌گیرند.',
          paragraph2: 'شرکت صنایع پخت مشهد از زمان تأسیس برای صادرات محصولات خود برنامه‌ریزی کرد و در سال ۱۳۷۱ با ارسال محصولات به آسیای میانه، صادرات خود را آغاز نمود و جزو اولین صادرکنندگان ماشین‌آلات پخت نان قرار گرفت. همچنین در سال‌های بعد با صادر کردن ماشین‌آلات خود به سایر کشورها، دامنه فعالیت‌هایش را گسترش داد و در حال حاضر، این شرکت بزرگ‌ترین تولیدکننده و صادرکننده دستگاه‌های نانوایی و قنادی در کشور می‌باشد و کامل‌ترین سبد محصولات را در میان رقبا در اختیار دارد.',
          paragraph3: 'محصولات صنایع پخت مشهد دارای استاندارد ملی ایران، گواهینامه ایزو ۹۰۰۱، گواهینامه‌های CE، UL و GOST می‌باشند. تلاش بی‌وقفه برای بهبود کیفیت تا رسیدن به استانداردهای جهانی و توسعه بازار بین‌المللی، صنایع پخت مشهد را در صدر صادرکنندگان فناوری‌های پخت قرار داده است و به دنبال آن این شرکت مفتخر به کسب عنوان «صادرکننده نمونه کشوری» در چندین سال پیاپی می‌باشد.',
          paragraph4: 'شرکت صنایع پخت مشهد، رعایت استانداردهای ملی و بین‌المللی را یکی از محورهای اصلی و الزامات کار خود قرار داده و توانسته است محصولات خود را به بیش از ۴۶ کشور دنیا صادر کند، از جمله آمریکا و کشورهای توسعه‌یافته اروپایی که در آن‌ها به عنوان یکی از نام‌های سرآمد تکنولوژی به چشم می‌خورد.',
          paragraph5: 'محصولات شرکت صنایع پخت مشهد به بیش از ۴۶ کشور دنیا صادر شده است، این شامل کشورهای مختلفی است که به عنوان نمونه می‌توان به موارد زیر اشاره کرد: (آمریکا، کانادا، آلمان، استرالیا، اسپانیا، انگلستان، روسیه، هلند، نروژ، سوئد، اتریش، نیوزلند، کره جنوبی، ترکیه، مالزی، تایلند، فیلیپین، اوکراین، ارمنستان، آذربایجان، گرجستان، قزاقستان، قرقیزستان، تاجیکستان، افغانستان، ترکمنستان، ازبکستان، پاکستان، عمان، عراق، لبنان، بحرین، عربستان، امارات و ...).'
        },
        highlight: {
          body: 'شرکت صنایع پخت مشهد به‌عنوان یکی از قدیمی‌ترین و معتبرترین تولیدکنندگان تجهیزات نانوایی، بیشترین تنوع مدل‌های دستگاه نانوایی را در ایران ارائه می‌دهد. ما در بخش‌های مختلف پخت نان، از جمله دستگاه بربری، دستگاه تافتون، دستگاه لواش و دستگاه سنگک مدل‌های متعدد با ظرفیت‌ها و امکانات متفاوت تولید می‌کنیم تا هر نانوایی—از سنتی تا نیمه‌صنعتی—بتواند دقیقاً مطابق نیاز خود انتخاب کند.',
          cta: 'تجهیزات نانوایی'
        },
        features: {
          people: {
            title: 'منابع انسانی توانمند',
            body: 'اصلی‌ترین و بزرگ‌ترین سرمایه هر شرکتی منابع انسانی آن شرکت است و ما با تکیه بر همین اصل در ۳۰ سال فعالیت صنعتی و تجاری خود، سرمایه‌های انسانی ارزشمندی را جذب و تربیت کرده‌ایم. در صنایع پخت مشهد، تعهد و اخلاق‌مداری، اخلاق حرفه‌ای، تخصص، مهارت و تجربه پایه و اساس تربیت و تعالی نیروی انسانی است. این منابع انسانی در واحدهای مختلف شامل طراحی، تحقیق و توسعه، ساخت و تولید، فروش و خدمات پس از فروش مشغول به فعالیت بوده و هدف اصلی خود را تداوم و بهبود رضایت مشتریان قرار داده‌اند.',
            imageAlt: 'واحد مهندسی صنایع پخت مشهد'
          },
          space: {
            title: 'فضا و بستر تولید',
            body: 'صنایع پخت مشهد، برای تولید محصولات و ارائه خدمات به مشتریان خود، بستری را با وسعتی بالغ بر ۵۰,۰۰۰ متر مربع احداث نموده که در نوع خود بی‌نظیر و پاسخگوی کلیه نیازهای شرکت می‌باشد.',
            imageAlt: 'نمای هوایی از صنایع پخت مشهد'
          },
          tech: {
            title: 'تکنولوژی های طراحی و ساخت',
            body: 'ما افتخار داریم که برای تولید هرچه با کیفیت‌تر محصولات و ارتقای سطح تولید و ارائه خدمات، بهترین و به‌روزترین تکنولوژی‌های طراحی و ساخت و تولید را به کار گرفته‌ایم. امکانات نرم‌افزاری و سخت‌افزاری قدرتمند برای طراحی و ماشین‌آلات مدرن، دقیق و اتوماتیک ساخت و تولید همگی در اختیار پرسنل طراحی و تولید صنایع پخت مشهد بوده تا در نهایت محصولی قابل رقابت در بازارهای جهانی در اختیار مشتریان قرار گیرد.',
            imageAlt: 'معرفی صنایع پخت مشهد'
          }
        },
        policy: {
          title: 'خط مشی شرکت',
          body: 'شرکت صنایع پخت مشهد در راستای تولید ماشین‌آلات پخت نان، با هدف ارتقای کیفیت محصولات خود و تأمین نیازمندی‌های مشتری و قانونی و بهبود مداوم محصولات به دنبال کسب سهم بیشتری از بازار، بعنوان یک اقدام بنیادی سیستم مدیریت کیفیت خود را مبتنی بر استاندارد ISO 9001-2008 طراحی نموده و متعهد به اجرای آن و نیازمندی‌های مشتری و قانونی و بهبود مداوم آن می‌باشد. حال به اقتضای این نظام و بینش برآنیم که با بهره‌گیری از کلیه امکانات و توانایی‌های خود و با توجه به آموزش و استفاده از نیروهای مجرب و شناسایی و تحت کنترل درآوردن تمامی فعالیت‌های مؤثر بر کیفیت از طریق اجرای مؤثر سیستم در کلیه سطوح، رضایت مشتری را در زمینه تولیدات خود جلب نماییم. از سوی دیگر جذب و تبدیل ایده‌ها به محصول و هم‌افزایی علم و ثروت (تجاری‌سازی علم و دانش) و تجاری‌سازی یافته‌های پژوهشی و تحقیقاتی مرتبط و حمایت، هدایت و سمت‌دهی در جهت نوآوری‌ها و افزایش سطح بازدهی ماشین‌آلات پخت نان از دیگر اهداف شرکت صنایع پخت مشهد می‌باشد.',
          leaders: {
            ceo: {
              name: 'ابوالقاسم اسحق آبادی',
              role: 'مدیر عامل'
            },
            plant: {
              name: 'محمدرضا اسحق آبادی',
              role: 'مدیر کارخانه'
            },
            rnd: {
              name: 'حسین اسحق آبادی',
              role: 'مدیر تحقیق و توسعه'
            }
          }
        }
      },
      afterSales: {
        heading: 'خدمات پس از فروش',
        body: 'این صفحه برای خدمات پس از فروش در نسخه داخلی سایت آماده شده است.'
      },
      contact: {
        heading: 'تماس با ما',
        heroAlt: 'تماس با صنایع پخت مشهد',
        intro: {
          title: 'تماس با صنایع پخت مشهد',
          body: 'از اینکه مجموعه صنایع پخت مشهد را به عنوان مجری ایده‌های خود انتخاب کرده‌اید، از شما سپاسگزاریم. تماس با شرکت صنایع پخت مشهد از طریق گفتگوی آنلاین، تماس تلفنی و بازدید حضوری امکان‌پذیر است. برای سفارش و مشاوره با متخصصین ما می‌توانید فرم تماس را ارسال نمایید.'
        },
        form: {
          title: 'فرم تماس',
          required: '(الزامی)',
          name: 'نام و نام خانوادگی',
          email: 'ایمیل',
          phone: 'شماره تماس',
          subject: 'موضوع',
          message: 'متن پیام',
          submit: 'ارسال ایمیل',
          submitting: 'در حال ارسال...',
          success: 'پیام شما با موفقیت ارسال شد.',
          error: 'ارسال پیام ناموفق بود. دوباره تلاش کنید.',
          requiredError: 'لطفا فیلدهای اجباری را تکمیل کنید.',
          captcha: 'من ربات نیستم'
        },
        locations: {
          factory: {
            title: 'کارخانه و خدمات پس از فروش',
            addressLabel: 'آدرس',
            address: 'مشهد، بزرگراه آسیایی، کیلومتر ۲۲، ابتدای جاده محمد آباد قائم مقام، کد پستی: ۹۳۵۹۱۷۴۷۹۹',
            phoneLabel: 'شماره تماس',
            phone: '۰۵۱۳۲۴۶۴۰۹۰',
            faxLabel: 'فاکس',
            fax: '۰۵۱۳۲۴۶۴۰۹۰',
            hoursLabel: 'ساعت کاری',
            hours: 'شنبه – چهارشنبه (روزهای غیر تعطیل) از ساعت ۷.۳۰ الی ۱۷'
          },
          headOffice: {
            title: 'دفتر مرکزی',
            addressLabel: 'آدرس',
            address: 'مشهد، خیابان ملک الشعراء بهار، بین بهار ۱۲ و ۱۴، پلاک ۵۷۹، کد پستی: ۹۱۷۳۶۷۵۱۵۶',
            phoneLabel: 'شماره تماس',
            phone: '۰۵۱۳۸۵۸۳۱۸۰',
            faxLabel: 'فاکس',
            fax: '۰۵۱۳۸۵۸۳۱۸۹',
            hoursLabel: 'ساعت کاری',
            hours: 'شنبه – پنجشنبه (روزهای غیر تعطیل) از ساعت ۸ الی ۲۰'
          },
          rnd: {
            title: 'مرکز تحقیق و توسعه صنایع پخت مشهد',
            addressLabel: 'آدرس',
            address: 'مشهد، خیابان وکیل آباد، دانشگاه فردوسی، پارک علم و فناوری، ساختمان چمران',
            hoursLabel: 'ساعت کاری',
            hours: 'شنبه – پنجشنبه (روزهای غیر تعطیل) از ساعت ۸ الی ۱۴'
          }
        },
        links: {
          linkedinLabel: 'لینکدین',
          researchEmailLabel: 'ایمیل'
        },
        channels: {
          title: 'با ما در تماس باشید',
          smsLabel: 'سامانه پیامکی',
          smsValue: '۱۰۰۰۳۲۰۲۲',
          emailLabel: 'ایمیل',
          emailValue: 'Info@mbico.ir'
        },
        social: {
          instagram: 'اینستاگرام',
          youtube: 'یوتیوب',
          soroush: 'سروش',
          eitaa: 'ایتا',
          rubika: 'روبیکا',
          aparat: 'آپارات',
          facebook: 'فیس بوک'
        },
        marketing: {
          title: 'تیم بازاریابی و فروش',
          members: {
            manager: {
              name: 'طاهره مالکی',
              role: 'مدیر بازاریابی و فروش'
            },
            sales1: {
              name: 'الهام فائزی',
              role: 'کارشناس بازاریابی و فروش'
            },
            sales2: {
              name: 'الهام زورآور',
              role: 'کارشناس بازاریابی و فروش'
            },
            sales3: {
              name: 'رضا پیوه ژن نژاد',
              role: 'کارشناس بازاریابی و فروش'
            }
          }
        },
        icons: {
          email: 'ایمیل',
          phone: 'تلفن',
          telegram: 'تلگرام',
          whatsapp: 'واتساپ'
        }
      }
    },
  },
  en: {
    brand: {
      name: 'Mashhad Baking Industries'
    },
    shared: {
      phoneDisplay: '051-32464090'
    },
    seo: {
      site: {
        title: 'Mashhad Baking Industries | MBICO',
        description: 'Manufacturer of bakery, pastry, and baking machinery'
      },
      products: {
        title: 'Products | MBICO',
        description: 'Product catalog of Mashhad Baking Industries'
      },
      categories: {
        title: 'Categories | MBICO',
        description: 'Browse product categories.'
      },
      categoryDetail: {
        titleFallback: 'Category | MBICO',
        descriptionFallback: 'Browse products in this category.'
      },
      blog: {
        title: 'Blog | MBICO',
        description: 'News and technical articles from Mashhad Baking Industries'
      },
      news: {
        title: 'News',
        description: 'Latest updates'
      },
      contact: {
        title: 'Contact',
        description: 'Contact channels'
      },
      about: {
        title: 'About',
        description: 'About the company'
      },
      academy: {
        title: 'Baking Academy',
        description: 'Training and articles'
      },
      afterSales: {
        title: 'After-Sales Service',
        description: 'Support and service'
      },
      blogPost: {
        titleFallback: 'Blog',
        descriptionFallback: 'Article'
      },
      productDetail: {
        titleFallback: 'Products | MBICO',
        descriptionFallback: 'Product details from Mashhad Baking Industries'
      }
    },
    header: {
      links: {
        home: 'Home',
        products: 'Products',
        categories: 'Categories',
        about: 'About',
        contact: 'Contact',
        blog: 'Blog'
      },
      mega: {
        categoriesLabel: 'Categories',
        viewAll: 'View all',
        fallbackCategory: 'Category',
        tabs: {
          ovens: {
            label: 'Baking ovens',
            items: {
              bakery: 'Bakery machines',
              bulk: 'Ovens for bulk and semi-bulk bread',
              pizza: 'Pizza and food ovens',
              lavash: 'Lavash oven',
              barbari: 'Barbari oven',
              sangak: 'Sangak oven',
              taftoon: 'Taftoon oven'
            }
          },
          equipment: {
            label: 'Baking equipment',
            items: {
              viewAll: 'View all baking equipment',
              products: 'Products',
              afterSales: 'After-sales service'
            }
          },
          mobile: {
            label: 'Mobile baking machinery',
            items: {
              viewAll: 'View all mobile baking machinery',
              products: 'Products'
            }
          }
        }
      },
      cta: {
        phone: 'Call: 051-32463080',
        phoneShort: 'Call: 051-32464090'
      },
      aria: {
        openMenu: 'Open menu',
        closeMenu: 'Close menu',
        close: 'Close'
      },
      language: {
        label: 'Language',
        fa: 'فارسی',
        en: 'English',
        ru: 'Русский'
      }
    },
    footer: {
      heroAlt: 'Mashhad Baking Industries plant view',
      tagline: 'Healthy bread, clean air, proud Iran',
      description: 'Mashhad Baking Industries follows a sustainable-development approach and delivers innovative baking solutions to improve productivity and quality.',
      quickAccess: 'Quick access',
      links: {
        products: 'Products',
        blog: 'Blog',
        afterSales: 'After-sales service',
        contact: 'Contact'
      },
      contactHeading: 'Contact',
      labels: {
        phone: 'Phone',
        website: 'Website',
        email: 'Email'
      },
      copyright: '© {{year}} Mashhad Baking Industries'
    },
    home: {
      hero: {
        alt: 'Mashhad Baking Industries International Company'
      },
      productCategories: {
        heading: 'Product categories',
        items: {
          ovens: 'Baking ovens',
          equipment: 'Baking equipment',
          mobile: 'Mobile baking machinery'
        }
      },
      ovenCategories: {
        heading: 'Main product groups',
        items: {
          bakery: 'Bakery ovens',
          lavash: 'Lavash ovens',
          barbari: 'Barbari ovens',
          taftoon: 'Taftoon ovens',
          sangak: 'Sangak ovens'
        },
        counts: {
          bakery: '9 products',
          lavash: '7 products',
          barbari: '6 products',
          taftoon: '6 products',
          sangak: '9 products'
        }
      },
      services: {
        title: 'Exported to 47 countries',
        text: 'Mashhad Baking Industries, the first knowledge-based company in the design and production of bread and pastry baking machinery and mobile baking containers, expands internationally with a focus on quality, efficiency, and after-sales support.',
        stats: {
          b2b: 'Industrial projects',
          qc: 'Quality control',
          sla: 'Support'
        },
        imageAlt: 'Export 47'
      },
      featured: {
        heading: 'Selected products; a professional solution for your needs',
        cta: 'Add to cart',
        fallbackProducts: {
          portableRotary: 'Portable rotary bakery oven',
          sangakAuto: 'Portable automatic Sangak oven',
          tunnel: 'Tunnel bakery oven',
          rotaryPastry: 'Rotary pastry oven'
        }
      },
      certificates: {
        title: 'Certificates and standards',
        subtitle: 'Certificates & standards',
        description: 'Mashhad Baking Industries products comply with six recognized international standards, ensuring quality, safety, and high efficiency in baking, pastry, and food production. These standards reflect our commitment to precise engineering, high-grade materials, and advanced manufacturing processes. The Eco Energy mark further confirms our focus on energy efficiency and environmental protection.',
        items: {
          ce: 'CE Europe',
          gost: 'GOST Russia',
          csa: 'CSA Canada',
          eco: 'Eco Energy mark',
          ul: 'UL Canada',
          iso: 'ISO 9001',
          iran: 'Iran National Standard'
        }
      },
      blogSection: {
        title: 'Latest news and articles',
        text: 'Stay updated with our latest news and key events. Keep up with us.',
        button: 'Our blog',
        error: 'Failed to load articles.',
        empty: 'No articles available yet.'
      },
      videoTeaser: {
        alt: 'Mashhad Baking Industries teaser',
        title: 'Mashhad Baking Industries teaser',
        text: 'Join us to see products and services up close.',
        playAria: 'Play video',
        closeAria: 'Close',
        modalTitle: 'Play video'
      }
    },
    products: {
      list: {
        title: 'Mashhad Baking Industries products',
        error: 'Failed to load products. Please try again.',
        empty: 'No products available.',
        priceFallback: 'Contact for price',
        cta: 'Add to cart',
        allTitle: 'Products'
      },
      sections: {
        ovens: 'Baking ovens',
        breadOvens: 'Bread baking machines',
        autoBreadOvens: 'Automatic bread baking machines',
        doughPrep: 'Dough preparation equipment and raw materials',
        doughForming: 'Dough forming equipment and proofing systems',
        cooling: 'Cooling systems',
        accessories: 'Accessories'
      }
    },
    productDetail: {
      fallbackNav: {
        intro: 'Product overview',
        specs: 'Technical specs',
        video: 'Product video',
        faq: 'FAQ'
      },
      catalogLabel: 'Catalog',
      noDetails: 'Product details will be updated soon.',
      fullDescription: 'Full description',
      loading: 'Loading product details...',
      error: 'Failed to load product details. Please try again.',
      downloadCatalog: 'Download catalog',
      specTable: {
        title: 'Models and technical specifications',
        rowLabel: 'Specification'
      },
      callToBuy: {
        title: 'Call to purchase and consultation',
        description: 'Our sales team is ready to answer questions and place orders.',
        primary: 'Call now',
        secondary: 'Contact form'
      },
      related: {
        title: 'Related products'
      },
      video: {
        prev: 'Previous video',
        next: 'Next video',
        play: 'Play video',
        close: 'Close video',
        goTo: 'Go to video {{index}}'
      }
    },
    categories: {
      list: {
        error: 'Unable to load categories right now. Please try again.',
        empty: 'No categories available yet.',
        noImage: 'No image',
        fallbackTitle: 'Categories'
      },
      detail: {
        label: 'Category',
        emptyDescription: 'Category details will be available soon.',
        viewProducts: 'View products',
        allCategories: 'All categories',
        error: 'Could not load category details. Showing the product list instead.',
        loading: 'Loading category details...',
        noImage: 'No image available',
        productsTitle: 'Products in this category',
        productsCount: '{{count}} items',
        productsError: 'Unable to load products. Please try again.',
        productsEmpty: 'No products in this category yet.',
        priceFallback: 'Price on request',
        viewDetails: 'View details'
      }
    },
    blog: {
      list: {
        heroLabel: 'Technical blog',
        heroTitle: 'Mashhad Baking Industries',
        heroSubtitle: 'Latest news, articles, and technical notes on production lines, equipment, and baking technologies.',
        introTitle: '✨ 🌿 Welcome to the Mashhad Baking Industries technical blog!',
        introParagraph1: 'Here you see the world of bread and pastry from a different angle—where science, craft, and experience converge to create precise results.',
        introParagraph2: 'We share knowledge on flour, bakery and pastry, applied baking tips, and everything needed for professional baking.',
        introNote: 'Stay with us to experience consistent, high-quality baking. 🥖 🎂',
        relatedTitle: 'Related articles',
        error: 'Failed to load blog posts.',
        empty: 'No posts available.'
      },
      detail: {
        metaDate: 'Published on {{date}}',
        metaAuthor: 'By {{author}}',
        back: 'Back',
        backToBlog: 'Back to blog',
        error: 'Failed to load article.'
      }
    },
    pages: {
      news: {
        heading: 'News',
        body: 'The news section is being prepared.'
      },
      academy: {
        heading: 'Baking Academy',
        body: 'Academy content will be added soon.'
      },
      about: {
        heading: 'About',
        nav: {
          company: 'Company overview',
          history: 'History',
          honors: 'Honors',
          gallery: 'Gallery'
        },
        heroAlt: 'About Mashhad Baking Industries',
        intro: {
          title: 'Introducing Mashhad Baking Industries',
          paragraph1: 'Mashhad Baking Industries was registered in 1370 with the goal of manufacturing bakery machines and baking equipment for bread and pastry, to meet domestic demand and enter global markets, under registration No. 7571 at the Khorasan Companies Registry. Operations began on a site of more than 50,000 square meters. With high design quality and refined appearance, our products have earned special attention nationwide, and our bakery machines are recognized as some of the best across Iranian cities and used to improve productivity.',
          paragraph2: 'From the start, the company planned to export its products and in 1371 began shipments to Central Asia, becoming one of the first exporters of bread-baking machinery. In the following years, exports to other countries expanded its footprint, and today the company is the country\'s largest manufacturer and exporter of bakery and pastry machines with the most complete product portfolio among competitors.',
          paragraph3: 'Mashhad Baking Industries products hold the Iranian National Standard, ISO 9001, and CE, UL, and GOST certifications. Continuous efforts to improve quality and reach global standards, along with international market development, have placed the company among the leading exporters of baking technologies and earned the title of "National Sample Exporter" for several consecutive years.',
          paragraph4: 'The company treats compliance with national and international standards as a core requirement and has exported products to more than 46 countries, including the United States and developed European countries where it is recognized as a leading technology name.',
          paragraph5: 'Products have been exported to more than 46 countries, including: United States, Canada, Germany, Australia, Spain, United Kingdom, Russia, Netherlands, Norway, Sweden, Austria, New Zealand, South Korea, Turkey, Malaysia, Thailand, Philippines, Ukraine, Armenia, Azerbaijan, Georgia, Kazakhstan, Kyrgyzstan, Tajikistan, Afghanistan, Turkmenistan, Uzbekistan, Pakistan, Oman, Iraq, Lebanon, Bahrain, Saudi Arabia, the UAE, and more.'
        },
        highlight: {
          body: 'As one of the oldest and most reputable manufacturers of bakery equipment, Mashhad Baking Industries offers the widest variety of bakery machine models in Iran. We build numerous models with different capacities and features for baking segments such as Barbari, Taftoon, Lavash, and Sangak so that every bakery, from traditional to semi-industrial, can choose exactly what it needs.',
          cta: 'Bakery equipment'
        },
        features: {
          people: {
            title: 'Skilled human resources',
            body: 'A company\'s most important asset is its people. Over 30 years of industrial and commercial activity, we have attracted and trained valuable human capital. At Mashhad Baking Industries, commitment, ethics, professionalism, expertise, and experience form the foundation of our workforce. Teams across design, R&D, manufacturing, sales, and after-sales service focus on sustaining and improving customer satisfaction.',
            imageAlt: 'Mashhad Baking Industries engineering unit'
          },
          space: {
            title: 'Production space and infrastructure',
            body: 'To produce products and serve customers, Mashhad Baking Industries has built a site of over 50,000 square meters that is unique in its class and meets all company needs.',
            imageAlt: 'Aerial view of Mashhad Baking Industries'
          },
          tech: {
            title: 'Design and manufacturing technologies',
            body: 'We are proud to use the most advanced design, engineering, and manufacturing technologies to produce higher-quality products and elevate service. Powerful software and hardware, along with modern, precise, automated machinery, support our design and production teams so that the final product can compete in global markets.',
            imageAlt: 'Introducing Mashhad Baking Industries'
          }
        },
        policy: {
          title: 'Company policy',
          body: 'To produce bread-baking machinery with the goal of improving product quality, meeting customer and legal requirements, and achieving continuous improvement, Mashhad Baking Industries has designed its quality management system based on ISO 9001:2008 and is committed to its implementation and ongoing improvement. In line with this system and vision, we leverage all capabilities, train and employ skilled staff, and identify and control all quality-affecting activities through effective system execution at every level to secure customer satisfaction. In parallel, turning ideas into products, combining knowledge and value (commercializing science and knowledge), and supporting research-based innovations to raise the performance of bread-baking machinery are among our core goals.',
          leaders: {
            ceo: {
              name: 'Abolghasem Eshaq Abadi',
              role: 'Chief Executive Officer'
            },
            plant: {
              name: 'Mohammadreza Eshaq Abadi',
              role: 'Plant Manager'
            },
            rnd: {
              name: 'Hossein Eshaq Abadi',
              role: 'R&D Director'
            }
          }
        }
      },
      afterSales: {
        heading: 'After-Sales Service',
        body: 'This page is prepared for the local site version of after-sales service.'
      },
      contact: {
        heading: 'Contact',
        heroAlt: 'Contact Mashhad Baking Industries',
        intro: {
          title: 'Contact Mashhad Baking Industries',
          body: 'Thank you for choosing Mashhad Baking Industries to bring your ideas to life. You can reach us via online chat, phone calls, or in-person visits. For orders and consultations, please submit the contact form.'
        },
        form: {
          title: 'Contact form',
          required: '(required)',
          name: 'Full name',
          email: 'Email',
          phone: 'Phone number',
          subject: 'Subject',
          message: 'Message',
          submit: 'Send email',
          submitting: 'Sending...',
          success: 'Your message has been sent.',
          error: 'Failed to send your message. Please try again.',
          requiredError: 'Please fill in all required fields.',
          captcha: 'I am not a robot'
        },
        locations: {
          factory: {
            title: 'Factory & after-sales service',
            addressLabel: 'Address',
            address: 'Mashhad, Asian Highway, km 22, beginning of Mohammad Abad Qaem-Maqam road, Postal code: 9359174799',
            phoneLabel: 'Phone',
            phone: '05132464090',
            faxLabel: 'Fax',
            fax: '05132464090',
            hoursLabel: 'Working hours',
            hours: 'Sat–Wed (non-holiday days) 07:30–17:00'
          },
          headOffice: {
            title: 'Head office',
            addressLabel: 'Address',
            address: "Mashhad, Malek-o Sho'ara Bahar St., between Bahar 12 and 14, No. 579, Postal code: 9173675156",
            phoneLabel: 'Phone',
            phone: '05138583180',
            faxLabel: 'Fax',
            fax: '05138583189',
            hoursLabel: 'Working hours',
            hours: 'Sat–Thu (non-holiday days) 08:00–20:00'
          },
          rnd: {
            title: 'R&D Center of Mashhad Baking Industries',
            addressLabel: 'Address',
            address: 'Mashhad, Vakilabad St., Ferdowsi University, Science and Technology Park, Chamran Building',
            hoursLabel: 'Working hours',
            hours: 'Sat–Thu (non-holiday days) 08:00–14:00'
          }
        },
        links: {
          linkedinLabel: 'LinkedIn',
          researchEmailLabel: 'Email'
        },
        channels: {
          title: 'Stay in touch',
          smsLabel: 'SMS center',
          smsValue: '100032022',
          emailLabel: 'Email',
          emailValue: 'info@mbico.ir'
        },
        social: {
          instagram: 'Instagram',
          youtube: 'YouTube',
          soroush: 'Soroush',
          eitaa: 'Eitaa',
          rubika: 'Rubika',
          aparat: 'Aparat',
          facebook: 'Facebook'
        },
        marketing: {
          title: 'Marketing & sales team',
          members: {
            manager: {
              name: 'Tahereh Maleki',
              role: 'Marketing & sales manager'
            },
            sales1: {
              name: 'Elham Faizi',
              role: 'Marketing & sales specialist'
            },
            sales2: {
              name: 'Elham Zoravar',
              role: 'Marketing & sales specialist'
            },
            sales3: {
              name: 'Reza Piveh Zhen Nezhad',
              role: 'Marketing & sales specialist'
            }
          }
        },
        icons: {
          email: 'Email',
          phone: 'Phone',
          telegram: 'Telegram',
          whatsapp: 'WhatsApp'
        }
      }
    }
  },
  ru: {
    brand: {
      name: 'Промышленность выпечки Мешхеда'
    },
    shared: {
      phoneDisplay: '051-32464090'
    },
    seo: {
      site: {
        title: 'Промышленность выпечки Мешхеда | MBICO',
        description: 'Производитель оборудования для хлебопечения, кондитерских и выпечных линий'
      },
      products: {
        title: 'Продукция | MBICO',
        description: 'Каталог продукции Mashhad Baking Industries'
      },
      categories: {
        title: 'Категории | MBICO',
        description: 'Просмотр категорий продукции.'
      },
      categoryDetail: {
        titleFallback: 'Категория | MBICO',
        descriptionFallback: 'Просмотр продукции в этой категории.'
      },
      blog: {
        title: 'Блог | MBICO',
        description: 'Новости и технические статьи Mashhad Baking Industries'
      },
      news: {
        title: 'Новости',
        description: 'Последние обновления'
      },
      contact: {
        title: 'Контакты',
        description: 'Каналы связи'
      },
      about: {
        title: 'О компании',
        description: 'Информация о компании'
      },
      academy: {
        title: 'Академия выпечки',
        description: 'Обучение и статьи'
      },
      afterSales: {
        title: 'Сервис после продажи',
        description: 'Поддержка и сервис'
      },
      blogPost: {
        titleFallback: 'Блог',
        descriptionFallback: 'Статья'
      },
      productDetail: {
        titleFallback: 'Продукция | MBICO',
        descriptionFallback: 'Описание продукции Mashhad Baking Industries'
      }
    },
    header: {
      links: {
        home: 'Главная',
        products: 'Продукция',
        categories: 'Категории',
        about: 'О компании',
        contact: 'Контакты',
        blog: 'Блог'
      },
      mega: {
        categoriesLabel: 'Категории',
        viewAll: 'Смотреть все',
        fallbackCategory: 'Категория',
        tabs: {
          ovens: {
            label: 'Печи для выпечки',
            items: {
              bakery: 'Хлебопекарное оборудование',
              bulk: 'Печи для объемного и полуобъемного хлеба',
              pizza: 'Печи для пиццы и блюд',
              lavash: 'Печь для лаваша',
              barbari: 'Печь для барбари',
              sangak: 'Печь для сангак',
              taftoon: 'Печь для тафтуна'
            }
          },
          equipment: {
            label: 'Оборудование для выпечки',
            items: {
              viewAll: 'Смотреть всё оборудование для выпечки',
              products: 'Продукция',
              afterSales: 'Сервис после продажи'
            }
          },
          mobile: {
            label: 'Мобильные линии выпечки',
            items: {
              viewAll: 'Смотреть все мобильные линии',
              products: 'Продукция'
            }
          }
        }
      },
      cta: {
        phone: 'Тел.: 051-32463080',
        phoneShort: 'Тел.: 051-32464090'
      },
      aria: {
        openMenu: 'Открыть меню',
        closeMenu: 'Закрыть меню',
        close: 'Закрыть'
      },
      language: {
        label: 'Язык',
        fa: 'فارسی',
        en: 'English',
        ru: 'Русский'
      }
    },
    footer: {
      heroAlt: 'Вид завода Mashhad Baking Industries',
      tagline: 'Здоровый хлеб, чистый воздух, гордый Иран',
      description: 'Mashhad Baking Industries ориентируется на устойчивое развитие и предлагает инновационные решения для повышения эффективности и качества.',
      quickAccess: 'Быстрые ссылки',
      links: {
        products: 'Продукция',
        blog: 'Блог',
        afterSales: 'Сервис после продажи',
        contact: 'Контакты'
      },
      contactHeading: 'Связаться с нами',
      labels: {
        phone: 'Телефон',
        website: 'Сайт',
        email: 'Email'
      },
      copyright: '© {{year}} Mashhad Baking Industries'
    },
    home: {
      hero: {
        alt: 'Международная компания Mashhad Baking Industries'
      },
      productCategories: {
        heading: 'Категории продукции',
        items: {
          ovens: 'Печи для выпечки',
          equipment: 'Оборудование для выпечки',
          mobile: 'Мобильные линии выпечки'
        }
      },
      ovenCategories: {
        heading: 'Основные группы продукции',
        items: {
          bakery: 'Хлебопекарные печи',
          lavash: 'Печи для лаваша',
          barbari: 'Печи для барбари',
          taftoon: 'Печи для тафтуна',
          sangak: 'Печи для сангак'
        },
        counts: {
          bakery: '9 продуктов',
          lavash: '7 продуктов',
          barbari: '6 продуктов',
          taftoon: '6 продуктов',
          sangak: '9 продуктов'
        }
      },
      services: {
        title: 'Экспорт в 47 стран',
        text: 'Mashhad Baking Industries — первая компания со статусом knowledge-based в области проектирования и производства оборудования для выпечки хлеба, кондитерских изделий и мобильных печных контейнеров. Мы расширяем международное присутствие, уделяя внимание качеству, эффективности и сервису.',
        stats: {
          b2b: 'Промышленные проекты',
          qc: 'Контроль качества',
          sla: 'Поддержка'
        },
        imageAlt: 'Экспорт 47'
      },
      featured: {
        heading: 'Отобранные продукты — профессиональное решение для ваших задач',
        cta: 'Добавить в корзину',
        fallbackProducts: {
          portableRotary: 'Портативная роторная хлебопекарная печь',
          sangakAuto: 'Портативная автоматическая печь для сангак',
          tunnel: 'Туннельная хлебопекарная печь',
          rotaryPastry: 'Роторная кондитерская печь'
        }
      },
      certificates: {
        title: 'Сертификаты и стандарты',
        subtitle: 'Сертификаты и стандарты',
        description: 'Продукция Mashhad Baking Industries соответствует шести международным стандартам, что подтверждает качество, безопасность и высокую эффективность в производстве хлеба, кондитерских изделий и пищи. Эти стандарты отражают нашу приверженность точной инженерии, качественным материалам и современным производственным процессам. Знак Eco Energy дополнительно подтверждает внимание к энергоэффективности и охране окружающей среды.',
        items: {
          ce: 'CE Европа',
          gost: 'ГОСТ Россия',
          csa: 'CSA Канада',
          eco: 'Знак Eco Energy',
          ul: 'UL Канада',
          iso: 'ISO 9001',
          iran: 'Национальный стандарт Ирана'
        }
      },
      blogSection: {
        title: 'Последние новости и статьи',
        text: 'Будьте в курсе наших новостей и ключевых событий. Оставайтесь с нами.',
        button: 'Наш блог',
        error: 'Не удалось загрузить статьи.',
        empty: 'Пока нет статей для отображения.'
      },
      videoTeaser: {
        alt: 'Тизер Mashhad Baking Industries',
        title: 'Тизер Mashhad Baking Industries',
        text: 'Посмотрите наши продукты и сервисы.',
        playAria: 'Воспроизвести видео',
        closeAria: 'Закрыть',
        modalTitle: 'Воспроизведение видео'
      }
    },
    products: {
      list: {
        title: 'Продукция Mashhad Baking Industries',
        error: 'Не удалось загрузить продукты. Попробуйте снова.',
        empty: 'Нет продукции для отображения.',
        priceFallback: 'Цена по запросу',
        cta: 'Добавить в корзину',
        allTitle: 'Продукция'
      },
      sections: {
        ovens: 'Печи для выпечки',
        breadOvens: 'Машины для выпечки хлеба',
        autoBreadOvens: 'Автоматические машины для выпечки хлеба',
        doughPrep: 'Оборудование для подготовки теста и сырья',
        doughForming: 'Оборудование для формовки и системы расстойки',
        cooling: 'Охлаждающие системы',
        accessories: 'Дополнительное оборудование'
      }
    },
    productDetail: {
      fallbackNav: {
        intro: 'Обзор продукта',
        specs: 'Технические характеристики',
        video: 'Видео продукта',
        faq: 'FAQ'
      },
      catalogLabel: 'Каталог',
      noDetails: 'Описание продукта будет добавлено позже.',
      fullDescription: 'Полное описание',
      loading: 'Загрузка данных продукта...',
      error: 'Не удалось загрузить данные продукта. Попробуйте снова.',
      downloadCatalog: 'Скачать каталог',
      specTable: {
        title: 'Модели и технические характеристики',
        rowLabel: 'Характеристика'
      },
      callToBuy: {
        title: 'Позвоните для покупки и консультации',
        description: 'Наши специалисты готовы ответить на вопросы и оформить заказ.',
        primary: 'Позвонить',
        secondary: 'Форма связи'
      },
      related: {
        title: 'Похожие товары'
      },
      video: {
        prev: 'Предыдущее видео',
        next: 'Следующее видео',
        play: 'Воспроизвести видео',
        close: 'Закрыть видео',
        goTo: 'Перейти к видео {{index}}'
      }
    },
    categories: {
      list: {
        error: 'Не удалось загрузить категории. Попробуйте снова.',
        empty: 'Категории пока отсутствуют.',
        noImage: 'Нет изображения',
        fallbackTitle: 'Категории'
      },
      detail: {
        label: 'Категория',
        emptyDescription: 'Описание категории будет добавлено позже.',
        viewProducts: 'Смотреть продукцию',
        allCategories: 'Все категории',
        error: 'Не удалось загрузить детали категории. Показан список продуктов.',
        loading: 'Загрузка сведений о категории...',
        noImage: 'Изображение недоступно',
        productsTitle: 'Продукция в этой категории',
        productsCount: '{{count}} позиций',
        productsError: 'Не удалось загрузить продукты. Попробуйте снова.',
        productsEmpty: 'В этой категории пока нет продукции.',
        priceFallback: 'Цена по запросу',
        viewDetails: 'Смотреть детали'
      }
    },
    blog: {
      list: {
        heroLabel: 'Технический блог',
        heroTitle: 'Mashhad Baking Industries',
        heroSubtitle: 'Последние новости, статьи и технические заметки о линиях, оборудовании и технологиях выпечки.',
        introTitle: '✨ 🌿 Добро пожаловать в технический блог Mashhad Baking Industries!',
        introParagraph1: 'Здесь вы увидите мир хлеба и кондитерских изделий под другим углом — где наука, ремесло и опыт объединяются для точных результатов.',
        introParagraph2: 'Мы делимся знаниями о муке, хлебопечении и кондитерском деле, практическими советами и всем, что нужно для профессиональной выпечки.',
        introNote: 'Оставайтесь с нами, чтобы вместе добиваться стабильного качества. 🥖 🎂',
        relatedTitle: 'Похожие статьи',
        error: 'Не удалось загрузить записи блога.',
        empty: 'Нет записей для отображения.'
      },
      detail: {
        metaDate: 'Опубликовано {{date}}',
        metaAuthor: 'Автор: {{author}}',
        back: 'Назад',
        backToBlog: 'Вернуться в блог',
        error: 'Не удалось загрузить статью.'
      }
    },
    pages: {
      news: {
        heading: 'Новости',
        body: 'Раздел новостей готовится.'
      },
      academy: {
        heading: 'Академия выпечки',
        body: 'Материалы академии будут добавлены позже.'
      },
      about: {
        heading: 'О компании',
        nav: {
          company: 'О компании',
          history: 'История',
          honors: 'Достижения',
          gallery: 'Галерея'
        },
        heroAlt: 'О компании Mashhad Baking Industries',
        intro: {
          title: 'О компании Mashhad Baking Industries',
          paragraph1: 'Компания Mashhad Baking Industries была зарегистрирована в 1370 году с целью производства хлебопекарных машин и оборудования для выпечки хлеба и кондитерских изделий, для обеспечения внутреннего спроса и выхода на мировые рынки, под регистрационным номером 7571 в Управлении регистрации компаний Хорасана. Производство было начато на площадке площадью более 50 000 кв. м. Благодаря высокому качеству дизайна и внешнего вида продукция компании пользуется особым вниманием, а наши хлебопекарные машины признаны одними из лучших во всех городах Ирана и используются для повышения эффективности.',
          paragraph2: 'С момента основания компания планировала экспорт и в 1371 году начала поставки в Центральную Азию, став одним из первых экспортеров хлебопекарного оборудования. В последующие годы экспорт расширился, и сегодня компания является крупнейшим производителем и экспортером хлебопекарных и кондитерских машин в стране и обладает самым полным портфелем продукции среди конкурентов.',
          paragraph3: 'Продукция Mashhad Baking Industries соответствует национальному стандарту Ирана, имеет сертификаты ISO 9001, CE, UL и GOST. Непрерывные усилия по повышению качества, достижению мировых стандартов и развитию международных рынков вывели компанию в число ведущих экспортеров технологий выпечки и принесли ей звание «Национальный образцовый экспортер» в течение нескольких лет подряд.',
          paragraph4: 'Соблюдение национальных и международных стандартов является одним из ключевых требований компании, и она смогла экспортировать продукцию более чем в 46 стран мира, включая США и развитые европейские страны, где она известна как один из лидеров технологий.',
          paragraph5: 'Продукция экспортируется более чем в 46 стран мира, включая: США, Канаду, Германию, Австралию, Испанию, Великобританию, Россию, Нидерланды, Норвегию, Швецию, Австрию, Новую Зеландию, Южную Корею, Турцию, Малайзию, Таиланд, Филиппины, Украину, Армению, Азербайджан, Грузию, Казахстан, Кыргызстан, Таджикистан, Афганистан, Туркменистан, Узбекистан, Пакистан, Оман, Ирак, Ливан, Бахрейн, Саудовскую Аравию, ОАЭ и другие.'
        },
        highlight: {
          body: 'Как один из старейших и наиболее авторитетных производителей хлебопекарного оборудования, Mashhad Baking Industries предлагает в Иране самый широкий ассортимент моделей хлебопекарных машин. Мы выпускаем множество моделей с разной производительностью и оснащением для различных видов выпечки — от печей для барбари, тафтуна, лаваша до сангака — чтобы каждая пекарня, от традиционной до полу-промышленной, могла выбрать оптимальное решение.',
          cta: 'Хлебопекарное оборудование'
        },
        features: {
          people: {
            title: 'Сильные кадровые ресурсы',
            body: 'Главный капитал любой компании — ее люди. За 30 лет промышленной и коммерческой деятельности мы привлекли и вырастили ценные кадры. В Mashhad Baking Industries приверженность делу, профессиональная этика, специализация, навыки и опыт являются основой развития персонала. Сотрудники в подразделениях дизайна, НИОКР, производства, продаж и послепродажного сервиса нацелены на постоянное улучшение удовлетворенности клиентов.',
            imageAlt: 'Инженерное подразделение Mashhad Baking Industries'
          },
          space: {
            title: 'Производственное пространство',
            body: 'Для производства и обслуживания клиентов Mashhad Baking Industries создала площадку площадью более 50 000 кв. м — уникальную по масштабу и полностью отвечающую потребностям компании.',
            imageAlt: 'Вид сверху на Mashhad Baking Industries'
          },
          tech: {
            title: 'Технологии проектирования и производства',
            body: 'Мы гордимся тем, что используем самые современные технологии проектирования и производства, чтобы повышать качество продукции и уровень сервиса. Мощное программное и аппаратное обеспечение, а также современное, точное и автоматизированное оборудование находятся в распоряжении наших инженеров и производственников, чтобы конечный продукт мог конкурировать на мировых рынках.',
            imageAlt: 'Презентация Mashhad Baking Industries'
          }
        },
        policy: {
          title: 'Политика компании',
          body: 'Для производства хлебопекарных машин, повышения качества продукции, удовлетворения требований клиентов и законодательства и постоянного улучшения, Mashhad Baking Industries разработала систему менеджмента качества на основе ISO 9001:2008 и привержена ее выполнению и постоянному совершенствованию. В рамках этой системы и подхода мы используем все возможности, обучаем и применяем опытные кадры, выявляем и контролируем все процессы, влияющие на качество, обеспечивая удовлетворенность клиентов на каждом уровне. Одновременно одним из ключевых направлений является преобразование идей в продукт, синергия науки и бизнеса (коммерциализация знаний), поддержка исследовательских разработок и продвижение инноваций для повышения эффективности хлебопекарных машин.',
          leaders: {
            ceo: {
              name: 'Абольгасем Эшак Абади',
              role: 'Генеральный директор'
            },
            plant: {
              name: 'Мохаммадреза Эшак Абади',
              role: 'Директор завода'
            },
            rnd: {
              name: 'Хосейн Эшак Абади',
              role: 'Директор по R&D'
            }
          }
        }
      },
      afterSales: {
        heading: 'Сервис после продажи',
        body: 'Страница подготовлена для локальной версии сайта.'
      },
      contact: {
        heading: 'Контакты',
        heroAlt: 'Контакты Mashhad Baking Industries',
        intro: {
          title: 'Свяжитесь с Mashhad Baking Industries',
          body: 'Спасибо, что выбрали Mashhad Baking Industries для реализации ваших идей. Связаться с нами можно через онлайн-чат, по телефону или при личном визите. Для заказа и консультации отправьте форму обратной связи.'
        },
        form: {
          title: 'Форма связи',
          required: '(обязательно)',
          name: 'Имя и фамилия',
          email: 'Email',
          phone: 'Номер телефона',
          subject: 'Тема',
          message: 'Сообщение',
          submit: 'Отправить',
          submitting: 'Отправка...',
          success: 'Ваше сообщение отправлено.',
          error: 'Не удалось отправить сообщение. Повторите попытку.',
          requiredError: 'Заполните все обязательные поля.',
          captcha: 'Я не робот'
        },
        locations: {
          factory: {
            title: 'Завод и сервис после продажи',
            addressLabel: 'Адрес',
            address: 'Мешхед, Азиатское шоссе, км 22, начало дороги Мохаммад-Абад Каэм-Магам, индекс: 9359174799',
            phoneLabel: 'Телефон',
            phone: '05132464090',
            faxLabel: 'Факс',
            fax: '05132464090',
            hoursLabel: 'Часы работы',
            hours: 'Сб–Ср (кроме праздников) 07:30–17:00'
          },
          headOffice: {
            title: 'Главный офис',
            addressLabel: 'Адрес',
            address: 'Мешхед, ул. Малек-о Шоара Бахар, между Бахар 12 и 14, дом 579, индекс: 9173675156',
            phoneLabel: 'Телефон',
            phone: '05138583180',
            faxLabel: 'Факс',
            fax: '05138583189',
            hoursLabel: 'Часы работы',
            hours: 'Сб–Чт (кроме праздников) 08:00–20:00'
          },
          rnd: {
            title: 'Центр исследований и разработок',
            addressLabel: 'Адрес',
            address: 'Мешхед, ул. Вакилабад, Университет Фердоуси, Парк науки и технологий, здание Chamran',
            hoursLabel: 'Часы работы',
            hours: 'Сб–Чт (кроме праздников) 08:00–14:00'
          }
        },
        links: {
          linkedinLabel: 'LinkedIn',
          researchEmailLabel: 'Email'
        },
        channels: {
          title: 'Будьте на связи',
          smsLabel: 'SMS-служба',
          smsValue: '100032022',
          emailLabel: 'Email',
          emailValue: 'info@mbico.ir'
        },
        social: {
          instagram: 'Instagram',
          youtube: 'YouTube',
          soroush: 'Soroush',
          eitaa: 'Eitaa',
          rubika: 'Rubika',
          aparat: 'Aparat',
          facebook: 'Facebook'
        },
        marketing: {
          title: 'Команда маркетинга и продаж',
          members: {
            manager: {
              name: 'Тахере Малекы',
              role: 'Руководитель маркетинга и продаж'
            },
            sales1: {
              name: 'Эльхам Фаизи',
              role: 'Специалист по маркетингу и продажам'
            },
            sales2: {
              name: 'Эльхам Зоравар',
              role: 'Специалист по маркетингу и продажам'
            },
            sales3: {
              name: 'Реза Пивех Жен-Нежад',
              role: 'Специалист по маркетингу и продажам'
            }
          }
        },
        icons: {
          email: 'Email',
          phone: 'Телефон',
          telegram: 'Telegram',
          whatsapp: 'WhatsApp'
        }
      }
    }
  }
}

export function isLocale(value: string): value is Locale {
  return value === 'fa' || value === 'en' || value === 'ru'
}
