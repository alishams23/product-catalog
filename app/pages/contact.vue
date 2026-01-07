<script setup lang="ts">
const { t, isRtl } = useTranslations()

useSeoMeta({
  title: computed(() => t('seo.contact.title')),
  description: computed(() => t('seo.contact.description'))
})

const heroImageLg = 'https://mbico.ir/wp-content/uploads/2024/07/mbi-countact-1400x510.jpg'
const heroImageSm = 'https://mbico.ir/wp-content/uploads/2024/07/mbi-countact.jpg'
const contactImage = 'https://mbico.ir/wp-content/uploads/2024/07/countactemail.png'
const contactEndpoint = '/api/contact'

const formState = reactive<Record<string, string>>({
  full_name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const validationMessage = ref<string | null>(null)
const submitLabel = computed(() => t('pages.contact.form.submit'))
const submittingLabel = computed(() => {
  const key = 'pages.contact.form.submitting'
  const value = t(key)
  return value === key ? submitLabel.value : value
})
const successMessage = computed(() => {
  const key = 'pages.contact.form.success'
  const value = t(key)
  return value === key ? 'پیام شما با موفقیت ارسال شد.' : value
})
const errorMessage = computed(() => {
  const key = 'pages.contact.form.error'
  const value = t(key)
  return value === key ? 'ارسال پیام ناموفق بود. دوباره تلاش کنید.' : value
})
const requiredErrorMessage = computed(() => {
  const key = 'pages.contact.form.requiredError'
  const value = t(key)
  return value === key ? 'لطفا فیلدهای اجباری را تکمیل کنید.' : value
})

const formFields = computed(() => ([
  {
    name: 'full_name',
    type: 'text',
    label: t('pages.contact.form.name'),
    placeholder: t('pages.contact.form.name'),
    required: true
  },
  {
    name: 'email',
    type: 'email',
    label: t('pages.contact.form.email'),
    placeholder: t('pages.contact.form.email'),
    required: true
  },
  {
    name: 'phone',
    type: 'tel',
    label: t('pages.contact.form.phone'),
    placeholder: t('pages.contact.form.phone'),
    required: true
  },
  {
    name: 'subject',
    type: 'text',
    label: t('pages.contact.form.subject'),
    placeholder: t('pages.contact.form.subject'),
    required: true
  },
  {
    name: 'message',
    type: 'textarea',
    label: t('pages.contact.form.message'),
    placeholder: t('pages.contact.form.message'),
    required: true
  }
]))

async function handleSubmit() {
  submitStatus.value = 'idle'
  validationMessage.value = null

  const payload = {
    full_name: formState.full_name.trim(),
    email: formState.email.trim(),
    phone: formState.phone.trim(),
    subject: formState.subject.trim(),
    message: formState.message.trim()
  }

  const missingRequired = Object.values(payload).some((value) => !value)
  if (missingRequired) {
    submitStatus.value = 'error'
    validationMessage.value = requiredErrorMessage.value
    return
  }

  if (isSubmitting.value) return
  isSubmitting.value = true

  try {
    await $fetch(contactEndpoint, {
      method: 'POST',
      body: payload
    })
    submitStatus.value = 'success'
    for (const key of Object.keys(formState)) {
      formState[key] = ''
    }
  } catch {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

const locations = computed(() => ([
  {
    id: 'factory',
    title: t('pages.contact.locations.factory.title'),
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30505.99160880881!2d59.35232912338775!3d36.51678671020059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f6c59618a310ca9%3A0xd4d281ec983c0633!2zTWFzaGhhZCBCYWtpbmcgSW5kdXN0cmllcyAtINi12YbYp9uM2Lkg2b7YrtiqINmF2LTZh9iv!5e0!3m2!1sen!2s!4v1712486525265!5m2!1sen!2s',
    details: [
      { label: t('pages.contact.locations.factory.addressLabel'), value: t('pages.contact.locations.factory.address') },
      {
        label: t('pages.contact.locations.factory.phoneLabel'),
        value: t('pages.contact.locations.factory.phone'),
        href: 'tel:+985132464090'
      },
      { label: t('pages.contact.locations.factory.faxLabel'), value: t('pages.contact.locations.factory.fax') },
      { label: t('pages.contact.locations.factory.hoursLabel'), value: t('pages.contact.locations.factory.hours') }
    ]
  },
  {
    id: 'head-office',
    title: t('pages.contact.locations.headOffice.title'),
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d205540.1485527707!2d59.31130208217295!3d36.39552761668441!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f6c91ec52c27807%3A0xfd7a0d2f04b8738f!2sMBICO%20Head%20Office!5e0!3m2!1sen!2s!4v1712486132395!5m2!1sen!2s',
    details: [
      { label: t('pages.contact.locations.headOffice.addressLabel'), value: t('pages.contact.locations.headOffice.address') },
      {
        label: t('pages.contact.locations.headOffice.phoneLabel'),
        value: t('pages.contact.locations.headOffice.phone'),
        href: 'tel:+985138583180'
      },
      { label: t('pages.contact.locations.headOffice.faxLabel'), value: t('pages.contact.locations.headOffice.fax') },
      { label: t('pages.contact.locations.headOffice.hoursLabel'), value: t('pages.contact.locations.headOffice.hours') }
    ]
  },
  {
    id: 'rnd-center',
    title: t('pages.contact.locations.rnd.title'),
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3215.06593917482!2d59.53297307625283!3d36.310707795138555!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f6c93004b34c22f%3A0x32364a2555aa6b7e!2z2YXYsdqp2LIg2KrYrdmC24zZgiDZiCDYqtmI2LPYudmHINi12YbYp9uM2Lkg2b7YrtiqINmF2LTZh9iv!5e0!3m2!1sen!2sde!4v1764486533537!5m2!1sen!2sde',
    details: [
      { label: t('pages.contact.locations.rnd.addressLabel'), value: t('pages.contact.locations.rnd.address') },
      { label: t('pages.contact.locations.rnd.hoursLabel'), value: t('pages.contact.locations.rnd.hours') }
    ]
  }
]))

const researchLinks = computed(() => ([
  {
    id: 'linkedin',
    href: 'http://www.linkedin.com/in/mbico-research-and-development-01323b397',
    icon: 'https://mbico.ir/wp-content/uploads/2025/11/linkedin-280x280.png',
    label: t('pages.contact.links.linkedinLabel')
  },
  {
    id: 'research-email',
    href: 'mailto:elhameshaghabadi@gmail.com',
    icon: 'https://mbico.ir/wp-content/uploads/2025/11/icons8-email.png',
    label: t('pages.contact.links.researchEmailLabel')
  }
]))

const socialLinks = computed(() => ([
  {
    id: 'instagram',
    href: 'https://www.instagram.com/mbibakingco',
    icon: 'https://mbico.ir/wp-content/uploads/2024/07/instagram-black.png',
    label: t('pages.contact.social.instagram')
  },
  {
    id: 'youtube',
    href: 'https://www.youtube.com/@MBICO-ep3ow',
    icon: 'https://mbico.ir/wp-content/uploads/2024/07/youtube-black.png',
    label: t('pages.contact.social.youtube')
  },
  {
    id: 'soroush',
    href: 'https://splus.ir/mbico2023',
    icon: 'https://mbico.ir/wp-content/uploads/2024/07/soroush-black.png',
    label: t('pages.contact.social.soroush')
  },
  {
    id: 'eitaa',
    href: 'https://eitaa.com/mbico2023',
    icon: 'https://mbico.ir/wp-content/uploads/2024/07/eita-black.png',
    label: t('pages.contact.social.eitaa')
  },
  {
    id: 'rubika',
    href: 'https://rubika.ir/@mbico2023',
    icon: 'https://mbico.ir/wp-content/uploads/2024/07/robika-black.png',
    label: t('pages.contact.social.rubika')
  },
  {
    id: 'aparat',
    href: 'https://www.aparat.com/mbico',
    icon: 'https://mbico.ir/wp-content/uploads/2024/07/aparat-black.png',
    label: t('pages.contact.social.aparat')
  },
  {
    id: 'facebook',
    href: 'https://www.facebook.com/bakingbread.mbico/',
    icon: 'https://mbico.ir/wp-content/uploads/2024/07/facebook-black.png',
    label: t('pages.contact.social.facebook')
  }
]))

const contactMethods = computed(() => ([
  {
    id: 'sms',
    icon: 'https://mbico.ir/wp-content/uploads/2024/07/sms-black.png',
    title: t('pages.contact.channels.smsLabel'),
    value: t('pages.contact.channels.smsValue')
  },
  {
    id: 'email',
    icon: 'https://mbico.ir/wp-content/uploads/2024/07/Email-black.png',
    title: t('pages.contact.channels.emailLabel'),
    value: t('pages.contact.channels.emailValue'),
    href: 'mailto:info@mbico.ir'
  }
]))

const marketingTeam = computed(() => ([
  {
    id: 'manager',
    name: t('pages.contact.marketing.members.manager.name'),
    role: t('pages.contact.marketing.members.manager.role'),
    avatar: 'https://mbico.ir/wp-content/uploads/2023/11/user-woman.png',
    email: 'sales2@mbico.ir',
    phone: '+989154298939',
    telegram: 'http://t.me/+989154298939',
    whatsapp: 'http://wa.me/+989154298939'
  },
  {
    id: 'sales1',
    name: t('pages.contact.marketing.members.sales1.name'),
    role: t('pages.contact.marketing.members.sales1.role'),
    avatar: 'https://mbico.ir/wp-content/uploads/2023/11/user-woman.png',
    email: 'trade@mbico.ir',
    phone: '+989120892022',
    telegram: 'http://t.me/+989120892022',
    whatsapp: 'http://wa.me/+989120892022'
  },
  {
    id: 'sales2',
    name: t('pages.contact.marketing.members.sales2.name'),
    role: t('pages.contact.marketing.members.sales2.role'),
    avatar: 'https://mbico.ir/wp-content/uploads/2023/11/user-woman.png',
    email: 'sales5@mbico.ir',
    phone: '+989105302023',
    telegram: 'http://t.me/+989105302023',
    whatsapp: 'http://wa.me/+989105302023'
  },
  {
    id: 'sales3',
    name: t('pages.contact.marketing.members.sales3.name'),
    role: t('pages.contact.marketing.members.sales3.role'),
    avatar: 'https://mbico.ir/wp-content/uploads/2023/11/user-Man.png',
    email: 'sales3@mbico.ir',
    phone: '+989158991924',
    telegram: 'http://t.me/+989158991924',
    whatsapp: 'http://wa.me/+989158991924'
  }
]))

const textAlign = computed(() => (isRtl.value ? 'text-right' : 'text-left'))
</script>

<template>
  <div class="bg-white">
    <section class="hidden bg-white px-4 py-[50px] sm:block sm:py-[80px] lg:px-10">
      <div class="mx-auto min-h-[200px] max-w-6xl sm:min-h-[700px]">
        <NuxtImg
          :src="heroImageLg"
          :alt="t('pages.contact.heroAlt')"
          class="h-full w-full object-cover"
        />
      </div>
    </section>

    <section class="bg-white px-4 py-[50px] sm:hidden">
      <NuxtImg
        :src="heroImageSm"
        :alt="t('pages.contact.heroAlt')"
        class="h-full w-full object-cover"
      />
    </section>

    <section class="relative -mt-4 pb-10 sm:-mt-10 lg:-mt-[420px] lg:pb-16">
      <div class="mx-auto max-w-6xl px-4">
        <div class="hidden gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_360px]">
          <div class="space-y-8">
            <div class="max-w-xl">
              <h1 class="text-xl font-semibold text-zinc-900 sm:text-2xl" :class="textAlign">
                {{ t('pages.contact.intro.title') }}
              </h1>
              <p class="mt-4 text-sm leading-8 text-zinc-800 text-justify">
                {{ t('pages.contact.intro.body') }}
              </p>
            </div>
            <NuxtImg
              :src="contactImage"
              :alt="t('pages.contact.form.title')"
              class="w-full max-w-md lg:-mt-16 lg:translate-x-8"
            />
          </div>

          <div
            id="sendmail"
            class="rounded-[40px] border border-amber-200/80 bg-[linear-gradient(140deg,#fffaf1_0%,#ffffff_55%,#fff1da_100%)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
          >
            <form class="space-y-4 text-xs" @submit.prevent="handleSubmit">
              <label v-for="field in formFields" :key="field.name" class="block text-zinc-900">
                <span class="font-semibold">
                  {{ field.label }}
                </span>
                <span v-if="field.required" class="text-amber-600">
                  {{ t('pages.contact.form.required') }}
                </span>
                <textarea
                  v-if="field.type === 'textarea'"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  v-model.trim="formState[field.name]"
                  :required="field.required"
                  :disabled="isSubmitting"
                  rows="4"
                  class="mt-2 w-full rounded-2xl border border-amber-200/70 bg-white px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
                <input
                  v-else
                  :type="field.type"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  v-model.trim="formState[field.name]"
                  :required="field.required"
                  :disabled="isSubmitting"
                  class="mt-2 w-full rounded-2xl border border-amber-200/70 bg-white px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </label>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full rounded-full bg-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(248,144,20,0.35)] transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {{ isSubmitting ? submittingLabel : submitLabel }}
              </button>

              <p v-if="submitStatus === 'success'" class="text-xs font-semibold text-emerald-700" role="status">
                {{ successMessage }}
              </p>
              <p v-else-if="submitStatus === 'error'" class="text-xs font-semibold text-rose-600" role="status">
                {{ validationMessage || errorMessage }}
              </p>
            </form>
          </div>
        </div>

        <div class="space-y-8 lg:hidden">
          <div class="space-y-4">
            <h1 class="text-center text-xl font-semibold text-zinc-900">
              {{ t('pages.contact.intro.title') }}
            </h1>
            <p class="text-sm leading-7 text-zinc-800 text-justify">
              {{ t('pages.contact.intro.body') }}
            </p>
          </div>

          <div
            class="rounded-[36px] border border-amber-200/80 bg-[linear-gradient(140deg,#fffaf1_0%,#ffffff_55%,#fff1da_100%)] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.18)]"
          >
            <form class="space-y-4 text-xs" @submit.prevent="handleSubmit">
              <label v-for="field in formFields" :key="field.name" class="block text-zinc-900">
                <span class="font-semibold">
                  {{ field.label }}
                </span>
                <span v-if="field.required" class="text-amber-600">
                  {{ t('pages.contact.form.required') }}
                </span>
                <textarea
                  v-if="field.type === 'textarea'"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  v-model.trim="formState[field.name]"
                  :required="field.required"
                  :disabled="isSubmitting"
                  rows="4"
                  class="mt-2 w-full rounded-2xl border border-amber-200/70 bg-white px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
                <input
                  v-else
                  :type="field.type"
                  :name="field.name"
                  :placeholder="field.placeholder"
                  v-model.trim="formState[field.name]"
                  :required="field.required"
                  :disabled="isSubmitting"
                  class="mt-2 w-full rounded-2xl border border-amber-200/70 bg-white px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200"
                />
              </label>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full rounded-full bg-amber-500 px-4 py-3 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(248,144,20,0.35)] transition hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {{ isSubmitting ? submittingLabel : submitLabel }}
              </button>

              <p v-if="submitStatus === 'success'" class="text-xs font-semibold text-emerald-700" role="status">
                {{ successMessage }}
              </p>
              <p v-else-if="submitStatus === 'error'" class="text-xs font-semibold text-rose-600" role="status">
                {{ validationMessage || errorMessage }}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white pb-10 pt-6 sm:pb-14 sm:pt-10">
      <div class="mx-auto max-w-6xl px-4">
        <div class="grid gap-10 lg:grid-cols-2">
          <div v-for="location in locations" :key="location.id" class="space-y-5" :class="location.id === 'rnd-center' ? 'lg:col-span-2' : ''">
            <iframe
              :src="location.mapSrc"
              class="h-[260px] w-full rounded-[32px] border-0 shadow-[0_18px_40px_rgba(0,0,0,0.12)] sm:h-[330px]"
              loading="lazy"
              allowfullscreen
            />
            <div class="rounded-3xl bg-white p-6 shadow-[0_14px_35px_rgba(0,0,0,0.08)]">
              <h3 class="text-base font-semibold text-zinc-900" :class="textAlign">
                {{ location.title }}
              </h3>
              <div class="mt-3 h-[2px] w-14 bg-amber-400" />
              <div class="mt-4 space-y-3 text-sm text-zinc-700" :class="textAlign">
                <p v-for="detail in location.details" :key="detail.label">
                  <strong class="text-zinc-900">{{ detail.label }}:</strong>
                  <template v-if="detail.href">
                    <a class="font-semibold text-amber-700 hover:text-amber-800" :href="detail.href">
                      {{ detail.value }}
                    </a>
                  </template>
                  <template v-else>
                    {{ detail.value }}
                  </template>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-10 flex justify-center">
          <div class="rounded-full border-2 border-amber-400 bg-white px-6 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
            <div class="flex items-center justify-center gap-4">
              <a
                v-for="link in researchLinks"
                :key="link.id"
                :href="link.href"
                target="_blank"
                rel="noopener"
                class="group"
                :aria-label="link.label"
              >
                <NuxtImg
                  :src="link.icon"
                  :alt="link.label"
                  class="h-10 w-10 rounded-full object-cover transition group-hover:scale-105"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-10 sm:py-14">
      <div class="mx-auto max-w-6xl px-4">
        <h2 class="text-center text-lg font-semibold text-zinc-900 sm:text-xl">
          {{ t('pages.contact.channels.title') }}
        </h2>
        <div class="mx-auto mt-6 flex flex-wrap justify-center gap-4 rounded-full border-2 border-amber-300 bg-white px-6 py-3 shadow-[0_12px_30px_rgba(0,0,0,0.12)]">
          <a
            v-for="link in socialLinks"
            :key="link.id"
            :href="link.href"
            target="_blank"
            rel="noopener"
            class="group"
            :aria-label="link.label"
          >
            <NuxtImg
              :src="link.icon"
              :alt="link.label"
              class="h-10 w-10 rounded-full object-cover transition group-hover:scale-105"
            />
          </a>
        </div>

        <div class="mt-10 grid gap-6 sm:grid-cols-2">
          <div
            v-for="method in contactMethods"
            :key="method.id"
            class="rounded-3xl bg-white p-6 text-center shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
          >
            <NuxtImg :src="method.icon" :alt="method.title" class="mx-auto h-12 w-12 object-contain" />
            <p class="mt-3 text-sm font-semibold text-zinc-900">
              {{ method.title }}
            </p>
            <p class="text-sm text-zinc-700">
              <a v-if="method.href" :href="method.href" class="font-semibold text-amber-700 hover:text-amber-800">
                {{ method.value }}
              </a>
              <span v-else>
                {{ method.value }}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white py-10 sm:py-14">
      <div class="mx-auto max-w-6xl px-4">
        <h2 class="text-center text-2xl font-semibold text-zinc-900">
          {{ t('pages.contact.marketing.title') }}
        </h2>
        <div class="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <article
            v-for="member in marketingTeam"
            :key="member.id"
            class="rounded-3xl bg-white p-5 text-center shadow-[0_16px_40px_rgba(0,0,0,0.1)]"
          >
            <div class="mx-auto w-32 overflow-hidden rounded-full shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
              <NuxtImg :src="member.avatar" :alt="member.name" class="h-32 w-32 object-cover" />
            </div>
            <h3 class="mt-4 text-sm font-semibold text-zinc-900">
              {{ member.name }}
            </h3>
            <p class="text-xs text-zinc-600">
              {{ member.role }}
            </p>
            <div class="mt-4 rounded-full border-2 border-amber-300 px-3 py-2">
              <div class="flex items-center justify-center gap-2">
                <a :href="`mailto:${member.email}`" class="group" :aria-label="t('pages.contact.icons.email')">
                  <NuxtImg
                    src="https://mbico.ir/wp-content/uploads/2024/07/Email-black.png"
                    :alt="t('pages.contact.icons.email')"
                    class="h-8 w-8 object-contain transition group-hover:scale-105"
                  />
                </a>
                <a :href="`tel:${member.phone}`" class="group" :aria-label="t('pages.contact.icons.phone')">
                  <NuxtImg
                    src="https://mbico.ir/wp-content/uploads/2024/07/phone-black.png"
                    :alt="t('pages.contact.icons.phone')"
                    class="h-8 w-8 object-contain transition group-hover:scale-105"
                  />
                </a>
                <a :href="member.telegram" class="group" target="_blank" rel="noopener" :aria-label="t('pages.contact.icons.telegram')">
                  <NuxtImg
                    src="https://mbico.ir/wp-content/uploads/2024/07/telgeram-black.png"
                    :alt="t('pages.contact.icons.telegram')"
                    class="h-8 w-8 object-contain transition group-hover:scale-105"
                  />
                </a>
                <a :href="member.whatsapp" class="group" target="_blank" rel="noopener" :aria-label="t('pages.contact.icons.whatsapp')">
                  <NuxtImg
                    src="https://mbico.ir/wp-content/uploads/2024/07/whatsap-black.png"
                    :alt="t('pages.contact.icons.whatsapp')"
                    class="h-8 w-8 object-contain transition group-hover:scale-105"
                  />
                </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>
