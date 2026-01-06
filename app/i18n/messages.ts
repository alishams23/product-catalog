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
        heading: 'دسته بندی فرهای پخت',
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
      loading: 'در حال دریافت اطلاعات محصول...',
      error: 'دریافت اطلاعات محصول با خطا مواجه شد. دوباره تلاش کنید.',
      downloadCatalog: 'دانلود کاتالوگ',
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
        body: 'این صفحه نسخه‌ی داخلی (لوکال) «درباره ما» است. می‌توانید محتوای کامل را بعداً اینجا اضافه کنید.'
      },
      afterSales: {
        heading: 'خدمات پس از فروش',
        body: 'این صفحه برای خدمات پس از فروش در نسخه داخلی سایت آماده شده است.'
      },
      contact: {
        heading: 'تماس با ما',
        infoHeading: 'اطلاعات تماس',
        descriptionHeading: 'توضیحات',
        description: 'این صفحه برای استفاده داخل همین سایت (لوکال) ساخته شده است.',
        phoneLabel: 'تلفن',
        emailLabel: 'ایمیل'
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
        heading: 'Oven categories',
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
      loading: 'Loading product details...',
      error: 'Failed to load product details. Please try again.',
      downloadCatalog: 'Download catalog',
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
        body: 'This is the local (internal) About page. You can add full content here later.'
      },
      afterSales: {
        heading: 'After-Sales Service',
        body: 'This page is prepared for the local site version of after-sales service.'
      },
      contact: {
        heading: 'Contact',
        infoHeading: 'Contact information',
        descriptionHeading: 'Notes',
        description: 'This page is intended for local use within this site.',
        phoneLabel: 'Phone',
        emailLabel: 'Email'
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
        heading: 'Категории печей',
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
      loading: 'Загрузка данных продукта...',
      error: 'Не удалось загрузить данные продукта. Попробуйте снова.',
      downloadCatalog: 'Скачать каталог',
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
        body: 'Это локальная версия страницы «О компании». Полный контент можно добавить позже.'
      },
      afterSales: {
        heading: 'Сервис после продажи',
        body: 'Страница подготовлена для локальной версии сайта.'
      },
      contact: {
        heading: 'Контакты',
        infoHeading: 'Контактная информация',
        descriptionHeading: 'Примечание',
        description: 'Эта страница предназначена для локального использования.',
        phoneLabel: 'Телефон',
        emailLabel: 'Email'
      }
    }
  }
}

export function isLocale(value: string): value is Locale {
  return value === 'fa' || value === 'en' || value === 'ru'
}
