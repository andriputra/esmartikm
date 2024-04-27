<template>
  <div class="container max-w-2xl">
    <header class="header">
      <h2>{{ $t('Profil') }}</h2>
    </header>
    <div class="content">
      <div class="py-4 px-6 relative">
        <avatar
          :src="$auth.user.product_thumbnail_url"
          :origin="$auth.user.product_image_url"
          :name="$auth.user.name"
          class="w-32 text-4xl absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2 -mt-2.5"
          frame-class="border-8 border-white"
        />
        <btn
          tag-name="nuxt-link"
          to="/user/update"
          variant="gradient"
          class="rounded-full border-8 border-white absolute left-1/2 -translate-x-1/2 top-8 text-sm"
        >
          <svg-icon name="edit" />{{ $t('Update') }}
        </btn>
        <h2 class="text-3xl font-bold mb-5 text-center mt-20">
          {{ $auth.user.name }}<br />
          <small class="text-base text-gray-500">
            <span class="font-normal">Since {{ since }}</span>
            <template v-if="$auth.user.city_id">
              <span class="font-normal">&ndash; from </span>
              {{ $auth.user.city.name }}
            </template>
          </small>
        </h2>
        <div class="flex flex-col space-y-3">
          <div
            v-if="$auth.user.status !== 'approved' || $auth.user.approval"
            class="card bg-yellow-50"
          >
            <div class="card__body flex items-center space-x-5">
              <svg-icon name="notification" class="w-12 h-12 text-gray-500" />
              <ul>
                <li
                  v-if="
                    $auth.user.approval &&
                    $auth.user.approval.status === 'pending'
                  "
                >
                  {{ $t('Admin is verifying your update request') }}<br />
                  {{ $t('Please wait patiently') }}
                </li>
                <li
                  v-if="
                    $auth.user.approval &&
                    $auth.user.approval.status === 'rejected'
                  "
                >
                  {{
                    $t(
                      'Your last update request has been rejected with the following reason:'
                    )
                  }}
                  <div class="font-bold text-lg text-red-800">
                    {{ $auth.user.approval.reason }}
                  </div>
                </li>
                <li v-if="$auth.user.status === 'pending'">
                  {{
                    $t('Your registration is pending for admin verification')
                  }}
                </li>
                <li v-if="$auth.user.status === 'rejected'">
                  {{ $t('We are sorry, your account is rejected') }}
                </li>
              </ul>
            </div>
          </div>
          <div class="card">
            <div class="card__body flex items-center space-x-5">
              <svg-icon name="trending_up" class="w-12 h-12 text-gray-500" />
              <div>
                <div class="text-lg font-bold">
                  {{ $auth.user.viewed }} {{ $t('times viewed') }}
                </div>
                {{ $t('Since') }} {{ registeredAt }}
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card__body flex space-x-5">
              <svg-icon name="info" class="w-12 h-12 text-gray-500" />
              <div>
                <div class="text-lg font-bold py-2">
                  {{ $t('Basic Information') }}
                </div>
                <ul class="attrs">
                  <li>
                    <span class="attrs__key">{{ $t('Field') }}</span>
                    <span class="attrs__val">{{ $auth.user.form_type }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Phone') }}</span>
                    <span class="attrs__val">{{ $auth.user.phone }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('NPWP') }}</span>
                    <span class="attrs__val">{{ $auth.user.npwp }}</span>
                  </li>
                  <li class="flex">
                    <span class="attrs__key">{{
                      $t('Number of Employees')
                    }}</span>
                    <span class="attrs__val">{{
                      $auth.user.number_of_employees
                    }}</span>
                  </li>
                  <li class="flex">
                    <span class="attrs__key">{{ $t('Established Date') }}</span>
                    <span class="attrs__val">{{ since }}</span>
                  </li>
                  <li class="flex">
                    <span class="attrs__key">{{ $t('Address') }}</span>
                    <span class="attrs__val">
                      {{ $auth.user.address }}
                      <div v-if="$auth.user.city_id">
                        {{ $auth.user.city.name }}
                      </div>
                    </span>
                  </li>
                  <li class="flex">
                    <span class="attrs__key">{{ $t('Business Type') }}</span>
                    <span class="attrs__val">{{
                      $auth.user.bussines_type
                    }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card__body flex space-x-5">
              <svg-icon name="security" class="w-12 h-12 text-gray-500" />
              <div class="flex-1">
                <div class="text-lg font-bold py-2">
                  {{ $t('License') }}
                </div>
                <ul class="attrs">
                  <li>
                    <span class="attrs__key">{{ $t('License') }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li
                          v-for="owned in $auth.user.bussines_license_owned"
                          :key="owned"
                        >
                          {{ owned }}
                        </li>
                      </ul>
                    </span>
                  </li>
                  <template
                    v-if="
                      typeof $auth.user.bussines_license_number === 'object'
                    "
                  >
                    <li
                      v-for="(licenseNumber, license) in $auth.user
                        .bussines_license_number"
                      :key="license"
                      class="flex"
                    >
                      <span class="attrs__key">{{ license }}</span>
                      <span class="attrs__val">{{ licenseNumber }}</span>
                    </li>
                  </template>
                  <li class="flex">
                    <span class="attrs__key">{{ $t('KBLI Number') }}</span>
                    <span class="attrs__val">{{ $auth.user.kbli_number }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card__body flex space-x-5">
              <avatar
                v-if="$auth.user.ktp_image"
                :src="$auth.user.ktp_thumbnail_url"
                :origin="$auth.user.ktp_image_url"
                name="I D"
                class="w-12 h-12"
              />
              <svg-icon
                v-else
                name="copyright"
                class="w-12 h-12 text-gray-500"
              />
              <div class="flex-1">
                <div class="text-lg font-bold py-2">{{ $t('Owner') }}</div>
                <ul class="attrs">
                  <li>
                    <span class="attrs__key">{{ $t('KTP') }}</span>
                    <span class="attrs__val">{{ $auth.user.ktp }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Name') }}</span>
                    <span class="attrs__val">{{ $auth.user.owner_name }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Phone') }}</span>
                    <span class="attrs__val">{{ $auth.user.owner_phone }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Birthdate') }}</span>
                    <span class="attrs__val">{{ birthdate }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Owner NPWP') }}</span>
                    <span class="attrs__val">{{ $auth.user.owner_npwp }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Education') }}</span>
                    <span class="attrs__val">{{ $auth.user.education }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            v-if="
              $auth.user.instagram ||
              $auth.user.facebook ||
              $auth.user.tokopedia ||
              $auth.user.bukalapak ||
              $auth.user.bliblicom ||
              $auth.user.indotrading ||
              $auth.user.shopee
            "
            class="card"
          >
            <div class="card__body flex space-x-5">
              <svg-icon name="link" class="w-12 h-12 text-gray-500" />
              <div class="flex-1">
                <div class="text-lg font-bold py-2">
                  {{ $t('Links') }}
                </div>
                <ul class="attrs">
                  <li v-if="$auth.user.instagram">
                    <span class="attrs__key">{{ $t('Instagram') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="$auth.user.instagram"
                        target="_blank"
                        class="content__link"
                        >{{ $auth.user.instagram }}</a
                      >
                    </span>
                  </li>
                  <li v-if="$auth.user.facebook">
                    <span class="attrs__key">{{ $t('Facebook') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="$auth.user.facebook"
                        target="_blank"
                        class="content__link"
                        >{{ $auth.user.facebook }}</a
                      >
                    </span>
                  </li>
                  <li v-if="$auth.user.youtube">
                    <span class="attrs__key">{{ $t('YouTube') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="$auth.user.youtube"
                        target="_blank"
                        class="content__link"
                        >{{ $auth.user.youtube }}</a
                      >
                    </span>
                  </li>
                  <li v-if="$auth.user.tiktok">
                    <span class="attrs__key">{{ $t('TikTok') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="$auth.user.tiktok"
                        target="_blank"
                        class="content__link"
                        >{{ $auth.user.tiktok }}</a
                      >
                    </span>
                  </li>
                  <li v-if="$auth.user.linkedin">
                    <span class="attrs__key">{{ $t('LinkedIn') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="$auth.user.linkedin"
                        target="_blank"
                        class="content__link"
                        >{{ $auth.user.linkedin }}</a
                      >
                    </span>
                  </li>
                  <li v-if="$auth.user.whatsapp">
                    <span class="attrs__key">{{ $t('Whatsapp') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="$auth.user.whatsapp"
                        target="_blank"
                        class="content__link"
                        >{{ $auth.user.whatsapp }}</a
                      >
                    </span>
                  </li>
                  <li v-if="$auth.user.website">
                    <span class="attrs__key">{{ $t('Website') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="$auth.user.website"
                        target="_blank"
                        class="content__link"
                        >{{ $auth.user.website }}</a
                      >
                    </span>
                  </li>
                  <li v-if="$auth.user.tokopedia">
                    <span class="attrs__key">{{ $t('Tokopedia') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="$auth.user.tokopedia"
                        target="_blank"
                        class="content__link"
                        >{{ $auth.user.tokopedia }}</a
                      >
                    </span>
                  </li>
                  <li v-if="$auth.user.bukalapak">
                    <span class="attrs__key">{{ $t('Bukalapak') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="$auth.user.bukalapak"
                        target="_blank"
                        class="content__link"
                        >{{ $auth.user.bukalapak }}</a
                      >
                    </span>
                  </li>
                  <li v-if="$auth.user.bliblicom">
                    <span class="attrs__key">{{ $t('Blibli') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="$auth.user.bliblicom"
                        target="_blank"
                        class="content__link"
                        >{{ $auth.user.bliblicom }}</a
                      >
                    </span>
                  </li>
                  <li v-if="$auth.user.shopee">
                    <span class="attrs__key">{{ $t('Shopee') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="$auth.user.shopee"
                        target="_blank"
                        class="content__link"
                        >{{ $auth.user.shopee }}</a
                      >
                    </span>
                  </li>
                  <li v-if="$auth.user.indotrading">
                    <span class="attrs__key">{{ $t('Indotrading') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="$auth.user.indotrading"
                        target="_blank"
                        class="content__link"
                        >{{ $auth.user.indotrading }}</a
                      >
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card__body flex space-x-5">
              <avatar
                v-if="$auth.user.product_image"
                :src="$auth.user.product_thumbnail_url"
                :origin="$auth.user.product_image_url"
                :name="$auth.user.name"
                class="w-12 h-12"
              />
              <svg-icon
                v-else
                name="group_work"
                class="w-12 h-12 text-gray-500"
              />
              <div class="flex-1">
                <div class="text-lg font-bold py-2">
                  {{ $t('Product') }}
                </div>
                <ul class="attrs">
                  <li>
                    <span class="attrs__key">{{ $t('Category') }}</span>
                    <span class="attrs__val">
                      <div class="text-sm">
                        {{ $auth.user.category.name }}
                      </div>
                      {{ $auth.user.sub_category.name }}
                    </span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Brand') }}</span>
                    <span class="attrs__val">{{
                      $auth.user.have_trademark
                    }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Consumers') }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li
                          v-for="consumer in $auth.user.product_consumer"
                          :key="consumer"
                        >
                          {{ consumer }}
                        </li>
                      </ul>
                    </span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Marketing Area') }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li
                          v-for="area in $auth.user.marketing_area"
                          :key="area"
                        >
                          {{ area }}
                        </li>
                      </ul>
                    </span>
                  </li>
                  <li
                    v-if="
                      $auth.user.product_certification ||
                      $auth.user.product_certification_file
                    "
                  >
                    <span class="attrs__key">{{
                      $t('Product Certification')
                    }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li v-if="$auth.user.product_certification">
                          {{ $auth.user.product_certification }}
                        </li>
                        <li v-if="$auth.user.product_certification_file">
                          <a
                            :href="$auth.user.product_certification_file_url"
                            target="_blank"
                            class="content__link text-sm"
                            ><svg-icon name="link" class="mr-2" />{{
                              $auth.user.product_certification_file
                            }}</a
                          >
                        </li>
                      </ul>
                    </span>
                  </li>
                  <li
                    v-if="
                      $auth.user.tkdn_certification ||
                      $auth.user.tkdn_certification_file
                    "
                  >
                    <span class="attrs__key">{{
                      $t('TKDN Certification')
                    }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li v-if="$auth.user.tkdn_certification">
                          {{ $auth.user.tkdn_certification }}
                        </li>
                        <li v-if="$auth.user.tkdn_certification_file">
                          <a
                            :href="$auth.user.tkdn_certification_file_url"
                            target="_blank"
                            class="content__link"
                            ><svg-icon name="link" class="mr-2" />{{
                              $auth.user.tkdn_certification_file
                            }}</a
                          >
                        </li>
                      </ul>
                    </span>
                  </li>
                  <li
                    v-if="
                      $auth.user.halal_certification ||
                      $auth.user.halal_certification_file
                    "
                  >
                    <span class="attrs__key">{{
                      $t('Halal Certification')
                    }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li v-if="$auth.user.halal_certification">
                          {{ $auth.user.halal_certification }}
                        </li>
                        <li v-if="$auth.user.halal_certification_file">
                          <a
                            :href="$auth.user.halal_certification_file_url"
                            target="_blank"
                            class="content__link"
                            ><svg-icon name="link" class="mr-2" />{{
                              $auth.user.halal_certification_file
                            }}</a
                          >
                        </li>
                      </ul>
                    </span>
                  </li>
                  <li
                    v-if="
                      $auth.user.sni_certification ||
                      $auth.user.sni_certification_file
                    "
                  >
                    <span class="attrs__key">{{
                      $t('SNI Certification')
                    }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li v-if="$auth.user.sni_certification">
                          {{ $auth.user.sni_certification }}
                        </li>
                        <li v-if="$auth.user.sni_certification_file">
                          <a
                            :href="$auth.user.sni_certification_file_url"
                            target="_blank"
                            class="content__link"
                            ><svg-icon name="link" class="mr-2" />{{
                              $auth.user.sni_certification_file
                            }}</a
                          >
                        </li>
                      </ul>
                    </span>
                  </li>
                  <li
                    v-if="
                      $auth.user.distribution_permit ||
                      $auth.user.distribution_permit_file
                    "
                  >
                    <span class="attrs__key">{{
                      $t('Distribution Permit')
                    }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li v-if="$auth.user.distribution_permit">
                          {{ $auth.user.distribution_permit }}
                        </li>
                        <li v-if="$auth.user.distribution_permit_file">
                          <a
                            :href="$auth.user.distribution_permit_file_url"
                            target="_blank"
                            class="content__link"
                            ><svg-icon name="link" class="mr-2" />{{
                              $auth.user.distribution_permit_file
                            }}</a
                          >
                        </li>
                      </ul>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card__body flex space-x-5">
              <svg-icon
                name="question_answer"
                class="w-12 h-12 text-gray-500"
              />
              <div class="flex-1">
                <div class="text-lg font-bold py-2">
                  {{ $t('Answers') }}
                </div>
                <ul class="attrs">
                  <li class="attr__multiline">
                    <span class="attrs__key">{{
                      $t(
                        'Do you have a team / personnel who will manage online marketing media?'
                      )
                    }}</span>
                    <span class="attrs__val">{{
                      $auth.user.have_online_admin ? $t('Yes') : $t('No')
                    }}</span>
                  </li>
                  <li class="attr__multiline">
                    <span class="attrs__key">{{
                      $t('Have you made financial records?')
                    }}</span>
                    <span class="attrs__val">{{
                      $auth.user.financial_record
                    }}</span>
                  </li>
                  <li class="attr__multiline">
                    <span class="attrs__key">{{
                      $t(
                        'Have you separated your personal / family finances from the company?'
                      )
                    }}</span>
                    <span class="attrs__val">{{
                      $auth.user.separating_finance ? $t('Yes') : $t('No')
                    }}</span>
                  </li>
                  <li class="attr__multiline">
                    <span class="attrs__key">{{
                      $t('The main obstacle faced in running a business')
                    }}</span>
                    <span class="attrs__val">{{
                      $auth.user.bussines_problem
                    }}</span>
                  </li>
                  <li class="attr__multiline">
                    <span class="attrs__key">{{
                      $t(
                        'Mention the facilitation activities of the Directorate General of IKMA of the Indonesian Ministry of Industry that have been attended (training, workshops, exhibition participation, etc.)'
                      )
                    }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li
                          v-for="program in $auth.user.attended_ikma_programs"
                          :key="program"
                        >
                          {{ program }}
                        </li>
                      </ul>
                    </span>
                  </li>
                  <li class="attr__multiline">
                    <span class="attrs__key">{{
                      $t(
                        'Facilitation activities you have participated in that are organized by other agencies (Ministries and Agencies)'
                      )
                    }}</span>
                    <span class="attrs__val">{{
                      $auth.user.attended_other_institution_programs
                    }}</span>
                  </li>
                  <li class="attr__multiline">
                    <span class="attrs__key">{{
                      $t(
                        'Are you willing to take part in the Technical Guidance and Digital Marketing Assistance program which will be implemented after the Program campaign period?'
                      )
                    }}</span>
                    <span class="attrs__val">{{
                      $auth.user.willing_digital_marketing_workshop_program
                        ? $t('Yes')
                        : $t('No')
                    }}</span>
                  </li>
                  <li class="attr__multiline">
                    <span class="attrs__key">{{
                      $t(
                        'What types of activities do you expect the Directorate General of IKMA of the Ministry of Industry to participate in?'
                      )
                    }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li
                          v-for="program in $auth.user.interested_ikma_programs"
                          :key="program"
                        >
                          {{ program }}
                        </li>
                      </ul>
                    </span>
                  </li>
                  <li class="attr__multiline">
                    <span class="attrs__key">{{
                      $t(
                        'What type of Technical Guidance / Training in the area interests you?'
                      )
                    }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li
                          v-for="training in $auth.user
                            .interested_ikma_trainings"
                          :key="training"
                        >
                          {{ training }}
                        </li>
                      </ul>
                    </span>
                  </li>
                  <li class="attr__multiline">
                    <span class="attrs__key">{{
                      $t(
                        'Where did you get information about this program from?'
                      )
                    }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li
                          v-for="from in $auth.user.get_info_from"
                          :key="from"
                        >
                          {{ from }}
                        </li>
                      </ul>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dateFormat from 'date-fns/format'
import dateParse from 'date-fns/parse'
import Avatar from '~/components/user/Avatar.vue'
import Btn from '~/components/Btn.vue'

export default Vue.extend({
  components: { Avatar, Btn },
  middleware({ $auth, redirect }) {
    // If the user is admin
    const user: any = $auth.user
    if (user.role_id !== 2) {
      return redirect('/user/account')
    }
  },
  computed: {
    since(): any {
      const user: any = this.$auth.user
      return dateFormat(
        dateParse(user.established_date, 'yyyy-MM-dd', new Date()),
        'dd MMMM yyyy '
      )
    },
    birthdate(): string {
      const user: any = this.$auth.user
      return dateFormat(
        dateParse(user.owner_birthdate, 'yyyy-MM-dd', new Date()),
        'dd MMMM yyyy'
      )
    },
    registeredAt(): string {
      const user: any = this.$auth.user
      return dateFormat(new Date(user.created_at), 'dd MMMM yyyy')
    },
  },
})
</script>
