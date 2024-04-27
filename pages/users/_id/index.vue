<template>
  <div class="container max-w-2xl">
    <header class="header">
      <nuxt-link to="/users" class="content__link font-bold text-lg -ml-4">
        <span class="inline-flex items-center">
          <svg-icon name="arrow_back" class="mr-1 w-4 h-4" />{{ $t('Back') }}
        </span>
      </nuxt-link>
      <h2>Profil Pengguna</h2>
    </header>
    <div class="content">
      <div class="py-4 px-6">
        <div class="flex justify-center">
          <avatar
            :src="attrs.product_thumbnail_url"
            :origin="attrs.product_image_url"
            :name="attrs.name"
            class="w-32 text-4xl"
            frame-class="border"
          />
        </div>
        <h2 class="text-3xl font-bold mt-5 text-center">
          {{ attrs.name }}<br />
          <small class="text-base text-gray-500">
            <span class="font-normal">{{ $t('Since') }} {{ since }}</span>
            <template v-if="attrs.city_id">
              <span class="font-normal">&ndash; {{ $t('from') }} </span>
              {{ attrs.city.name }}
            </template>
          </small>
        </h2>
        <div class="flex justify-center mt-3 mb-10">
          <btn
            tag-name="nuxt-link"
            :to="`/users/${attrs.id}/update`"
            class="rounded-full text-sm"
          >
            <svg-icon name="edit" />{{ $t('Update') }}
          </btn>
        </div>
        <div class="flex flex-col space-y-3">
          <div v-if="attrs.status === 'rejected'" class="card bg-red-50">
            <div class="card__body flex items-center space-x-5">
              <svg-icon name="notification" class="w-12 h-12 text-gray-500" />
              <div class="flex-1">
                {{ $t('This account was rejected') }}
              </div>
            </div>
          </div>
          <div v-if="attrs.status === 'pending'" class="card bg-yellow-50">
            <div class="card__body flex items-center space-x-5">
              <svg-icon name="notification" class="w-12 h-12 text-gray-500" />
              <div class="flex-1">
                {{ $t('This account is waiting for your verification') }}
              </div>
              <loading v-if="verifying" />
              <span v-else class="space-x-3">
                <btn
                  variant="icon"
                  class="green-600 opacity-50 hover:opacity-100"
                  @click="approveClickHandler"
                  ><svg-icon name="thumb_up_alt"
                /></btn>
                <btn
                  variant="icon"
                  class="red-600 opacity-50 hover:opacity-100"
                  @click="rejectClickHandler"
                  ><svg-icon name="thumb_down_alt"
                /></btn>
              </span>
            </div>
          </div>
          <div class="card">
            <div class="card__body flex items-center space-x-5">
              <svg-icon name="trending_up" class="w-12 h-12 text-gray-500" />
              <div>
                <div class="text-lg font-bold">
                  {{ attrs.viewed }} {{ $t('times viewed') }}
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
                    <span class="attrs__val">{{ attrs.form_type }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Phone') }}</span>
                    <span class="attrs__val">{{ attrs.phone }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('NPWP') }}</span>
                    <span class="attrs__val">{{ attrs.npwp }}</span>
                  </li>
                  <li class="flex">
                    <span class="attrs__key">{{
                      $t('Number of Employees')
                    }}</span>
                    <span class="attrs__val">{{
                      attrs.number_of_employees
                    }}</span>
                  </li>
                  <li class="flex">
                    <span class="attrs__key">{{ $t('Investment Value') }}</span>
                    <span class="attrs__val">{{ attrs.investment_value }}</span>
                  </li>
                  <li class="flex">
                    <span class="attrs__key">{{ $t('IKM Type') }}</span>
                    <span class="attrs__val">{{ attrs.ikm_type }}</span>
                  </li>
                  <li class="flex">
                    <span class="attrs__key">{{ $t('Established Date') }}</span>
                    <span class="attrs__val">{{ since }}</span>
                  </li>
                  <li class="flex">
                    <span class="attrs__key">{{ $t('Address') }}</span>
                    <span class="attrs__val">
                      {{ attrs.address }}
                      <div v-if="attrs.city_id">
                        {{ attrs.city.name }}
                      </div>
                    </span>
                  </li>
                  <li class="flex">
                    <span class="attrs__key">{{ $t('Business Type') }}</span>
                    <span class="attrs__val">{{ attrs.bussines_type }}</span>
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
                          v-for="owned in attrs.bussines_license_owned"
                          :key="owned"
                        >
                          {{ owned }}
                        </li>
                      </ul>
                    </span>
                  </li>
                  <template
                    v-if="typeof attrs.bussines_license_number === 'object'"
                  >
                    <li
                      v-for="(
                        licenseNumber, license
                      ) in attrs.bussines_license_number"
                      :key="license"
                      class="flex"
                    >
                      <span class="attrs__key">{{ license }}</span>
                      <span class="attrs__val">{{ licenseNumber }}</span>
                    </li>
                  </template>
                  <li class="flex">
                    <span class="attrs__key">{{ $t('KBLI Number') }}</span>
                    <span class="attrs__val">{{ attrs.kbli_number }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card__body flex space-x-5">
              <avatar
                v-if="attrs.ktp_image"
                :src="attrs.ktp_thumbnail_url"
                :origin="attrs.ktp_image_url"
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
                    <span class="attrs__val">{{ attrs.ktp }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Owner Name') }}</span>
                    <span class="attrs__val">{{ attrs.owner_name }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Phone') }}</span>
                    <span class="attrs__val">{{ attrs.owner_phone }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Email') }}</span>
                    <span class="attrs__val">{{ attrs.email }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Birthdate') }}</span>
                    <span class="attrs__val">{{ birthdate }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('NPWP') }}</span>
                    <span class="attrs__val">{{ attrs.owner_npwp }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Education') }}</span>
                    <span class="attrs__val">{{ attrs.education }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div
            v-if="
              attrs.instagram ||
              attrs.facebook ||
              attrs.tokopedia ||
              attrs.bukalapak ||
              attrs.bliblicom ||
              attrs.indotrading ||
              attrs.shopee
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
                  <li v-if="attrs.instagram">
                    <span class="attrs__key">{{ $t('Instagram') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="attrs.instagram"
                        target="_blank"
                        class="content__link"
                        >{{ attrs.instagram }}</a
                      >
                    </span>
                  </li>
                  <li v-if="attrs.facebook">
                    <span class="attrs__key">{{ $t('Facebook') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="attrs.facebook"
                        target="_blank"
                        class="content__link"
                        >{{ attrs.facebook }}</a
                      >
                    </span>
                  </li>
                  <li v-if="attrs.youtube">
                    <span class="attrs__key">{{ $t('YouTube') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="attrs.youtube"
                        target="_blank"
                        class="content__link"
                        >{{ attrs.youtube }}</a
                      >
                    </span>
                  </li>
                  <li v-if="attrs.tiktok">
                    <span class="attrs__key">{{ $t('TikTok') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="attrs.tiktok"
                        target="_blank"
                        class="content__link"
                        >{{ attrs.tiktok }}</a
                      >
                    </span>
                  </li>
                  <li v-if="attrs.linkedin">
                    <span class="attrs__key">{{ $t('LinkedIn') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="attrs.linkedin"
                        target="_blank"
                        class="content__link"
                        >{{ attrs.linkedin }}</a
                      >
                    </span>
                  </li>
                  <li v-if="attrs.whatsapp">
                    <span class="attrs__key">{{ $t('Whatsapp') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="attrs.whatsapp"
                        target="_blank"
                        class="content__link"
                        >{{ attrs.whatsapp }}</a
                      >
                    </span>
                  </li>
                  <li v-if="attrs.website">
                    <span class="attrs__key">{{ $t('Website') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="attrs.website"
                        target="_blank"
                        class="content__link"
                        >{{ attrs.website }}</a
                      >
                    </span>
                  </li>
                  <li v-if="attrs.tokopedia">
                    <span class="attrs__key">{{ $t('Tokopedia') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="attrs.tokopedia"
                        target="_blank"
                        class="content__link"
                        >{{ attrs.tokopedia }}</a
                      >
                    </span>
                  </li>
                  <li v-if="attrs.bukalapak">
                    <span class="attrs__key">{{ $t('Bukalapak') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="attrs.bukalapak"
                        target="_blank"
                        class="content__link"
                        >{{ attrs.bukalapak }}</a
                      >
                    </span>
                  </li>
                  <li v-if="attrs.bliblicom">
                    <span class="attrs__key">{{ $t('Blibli') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="attrs.bliblicom"
                        target="_blank"
                        class="content__link"
                        >{{ attrs.bliblicom }}</a
                      >
                    </span>
                  </li>
                  <li v-if="attrs.shopee">
                    <span class="attrs__key">{{ $t('Shopee') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="attrs.shopee"
                        target="_blank"
                        class="content__link"
                        >{{ attrs.shopee }}</a
                      >
                    </span>
                  </li>
                  <li v-if="attrs.indotrading">
                    <span class="attrs__key">{{ $t('Indotrading') }}</span>
                    <span class="attrs__val">
                      <a
                        :href="attrs.indotrading"
                        target="_blank"
                        class="content__link"
                        >{{ attrs.indotrading }}</a
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
                v-if="attrs.product_image"
                :src="attrs.product_thumbnail_url"
                :origin="attrs.product_image_url"
                :name="attrs.name"
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
                        {{ attrs.category.name }}
                      </div>
                      {{ attrs.sub_category.name }}
                    </span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Brand') }}</span>
                    <span class="attrs__val">{{ attrs.have_trademark }}</span>
                  </li>
                  <li>
                    <span class="attrs__key">{{ $t('Consumers') }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li
                          v-for="consumer in attrs.product_consumer"
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
                        <li v-for="area in attrs.marketing_area" :key="area">
                          {{ area }}
                        </li>
                      </ul>
                    </span>
                  </li>
                  <li
                    v-if="
                      attrs.product_certification ||
                      attrs.product_certification_file
                    "
                  >
                    <span class="attrs__key">{{
                      $t('Product Certification')
                    }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li v-if="attrs.product_certification">
                          {{ attrs.product_certification }}
                        </li>
                        <li v-if="attrs.product_certification_file">
                          <a
                            :href="attrs.product_certification_file_url"
                            target="_blank"
                            class="content__link text-sm"
                            ><svg-icon name="link" class="mr-2" />{{
                              attrs.product_certification_file
                            }}</a
                          >
                        </li>
                      </ul>
                    </span>
                  </li>
                  <li
                    v-if="
                      attrs.tkdn_certification || attrs.tkdn_certification_file
                    "
                  >
                    <span class="attrs__key">{{
                      $t('TKDN Certification')
                    }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li v-if="attrs.tkdn_certification">
                          {{ attrs.tkdn_certification }}
                        </li>
                        <li v-if="attrs.tkdn_certification_file">
                          <a
                            :href="attrs.tkdn_certification_file_url"
                            target="_blank"
                            class="content__link"
                            ><svg-icon name="link" class="mr-2" />{{
                              attrs.tkdn_certification_file
                            }}</a
                          >
                        </li>
                      </ul>
                    </span>
                  </li>
                  <li
                    v-if="
                      attrs.halal_certification ||
                      attrs.halal_certification_file
                    "
                  >
                    <span class="attrs__key">{{
                      $t('Halal Certification')
                    }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li v-if="attrs.halal_certification">
                          {{ attrs.halal_certification }}
                        </li>
                        <li v-if="attrs.halal_certification_file">
                          <a
                            :href="attrs.halal_certification_file_url"
                            target="_blank"
                            class="content__link"
                            ><svg-icon name="link" class="mr-2" />{{
                              attrs.halal_certification_file
                            }}</a
                          >
                        </li>
                      </ul>
                    </span>
                  </li>
                  <li
                    v-if="
                      attrs.sni_certification || attrs.sni_certification_file
                    "
                  >
                    <span class="attrs__key">{{
                      $t('SNI Certification')
                    }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li v-if="attrs.sni_certification">
                          {{ attrs.sni_certification }}
                        </li>
                        <li v-if="attrs.sni_certification_file">
                          <a
                            :href="attrs.sni_certification_file_url"
                            target="_blank"
                            class="content__link"
                            ><svg-icon name="link" class="mr-2" />{{
                              attrs.sni_certification_file
                            }}</a
                          >
                        </li>
                      </ul>
                    </span>
                  </li>
                  <li
                    v-if="
                      attrs.distribution_permit ||
                      attrs.distribution_permit_file
                    "
                  >
                    <span class="attrs__key">{{
                      $t('Distribution Permit')
                    }}</span>
                    <span class="attrs__val">
                      <ul>
                        <li v-if="attrs.distribution_permit">
                          {{ attrs.distribution_permit }}
                        </li>
                        <li v-if="attrs.distribution_permit_file">
                          <a
                            :href="attrs.distribution_permit_file_url"
                            target="_blank"
                            class="content__link"
                            ><svg-icon name="link" class="mr-2" />{{
                              attrs.distribution_permit_file
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
                      attrs.have_online_admin ? $t('Yes') : $t('No')
                    }}</span>
                  </li>
                  <li class="attr__multiline">
                    <span class="attrs__key">{{
                      $t('Have you made financial records?')
                    }}</span>
                    <span class="attrs__val">{{ attrs.financial_record }}</span>
                  </li>
                  <li class="attr__multiline">
                    <span class="attrs__key">{{
                      $t(
                        'Have you separated your personal / family finances from the company?'
                      )
                    }}</span>
                    <span class="attrs__val">{{
                      attrs.separating_finance ? $t('Yes') : $t('No')
                    }}</span>
                  </li>
                  <li class="attr__multiline">
                    <span class="attrs__key">{{
                      $t('The main obstacle faced in running a business')
                    }}</span>
                    <span class="attrs__val">{{ attrs.bussines_problem }}</span>
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
                          v-for="program in attrs.attended_ikma_programs"
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
                      attrs.attended_other_institution_programs
                    }}</span>
                  </li>
                  <li class="attr__multiline">
                    <span class="attrs__key">{{
                      $t(
                        'Are you willing to take part in the Technical Guidance and Digital Marketing Assistance program which will be implemented after the Program campaign period?'
                      )
                    }}</span>
                    <span class="attrs__val">{{
                      attrs.willing_digital_marketing_workshop_program
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
                          v-for="program in attrs.interested_ikma_programs"
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
                          v-for="training in attrs.interested_ikma_trainings"
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
                        <li v-for="from in attrs.get_info_from" :key="from">
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
        <div class="text-center my-10">
          <btn class="red-700" @click="deleteClickHandler">
            <svg-icon name="delete" />
            {{ $t('Delete') }}
          </btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'
import dateFormat from 'date-fns/format'
import dateParse from 'date-fns/parse'
import Avatar from '~/components/user/Avatar.vue'
import Btn from '~/components/Btn.vue'
import Loading from '~/components/Loading.vue'

export default Vue.extend({
  components: { Avatar, Btn, Loading },
  computed: {
    ...mapState('users/model', ['attrs', 'loading', 'verifying']),
    since(): any {
      return dateFormat(
        dateParse(this.attrs.established_date, 'yyyy-MM-dd', new Date()),
        'dd MMMM yyyy '
      )
    },
    birthdate(): string {
      return dateFormat(
        dateParse(this.attrs.owner_birthdate, 'yyyy-MM-dd', new Date()),
        'dd MMMM yyyy'
      )
    },
    registeredAt(): string {
      return dateFormat(new Date(this.attrs.created_at), 'dd MMMM yyyy')
    },
  },
  methods: {
    ...mapActions('users/model', {
      approve: 'APPROVE',
      reject: 'REJECT',
      delete: 'DELETE',
    }),
    async approveClickHandler() {
      const confirmText: any = this.$t('Approve?')
      if (!window.confirm(confirmText)) {
        return
      }

      const { error } = await this.approve()

      if (error) {
        this.$toast('error', {
          text: this.$t('Sorry, something went wrong'),
        }).show()
      } else {
        this.$toast('success', {
          text: this.$t('User verified!'),
        }).show()
      }
    },
    async rejectClickHandler() {
      const confirmText: any = this.$t('Reject?')
      if (!window.confirm(confirmText)) {
        return
      }

      const { error } = await this.reject()

      if (error) {
        this.$toast('error', {
          text: this.$t('Sorry, something went wrong'),
        }).show()
      } else {
        this.$toast('success', {
          text: this.$t('User rejected!'),
        }).show()
      }
    },
    async deleteClickHandler() {
      const confirmText: any = this.$t('Delete?')
      if (!window.confirm(confirmText)) {
        return
      }

      const { error } = await this.delete()

      if (error) {
        this.$toast('error', {
          text: this.$t('Sorry, something went wrong'),
        }).show()
      } else {
        this.$toast('success', {
          text: this.$t('User deleted!'),
        }).show()

        this.$router.replace('/users')
      }
    },
  },
})
</script>
