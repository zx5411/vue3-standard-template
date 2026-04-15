<template>
  <section>
    <header class="page-header">
      <div>
        <p class="page-header__eyebrow">{{ t('page.system') }}</p>
        <h1>{{ t('page.userManagement') }}</h1>
      </div>
      <RightToolbar :show-search="showSearch" @refresh="loadData" @toggle-search="appStore.toggleSearch()" />
    </header>

    <SearchToolbar :visible="showSearch" @search="handleSearch" @reset="handleReset" />

    <div class="card table-card">
      <table class="user-table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.userId">
            <td>{{ row.userName }}</td>
            <td>{{ row.phonenumber }}</td>
            <td>{{ row.roleName }}</td>
            <td>{{ row.status === '0' ? 'Enabled' : 'Disabled' }}</td>
          </tr>
        </tbody>
      </table>

      <Pagination v-model="queryParams.pageNum" :total="total" @update:model-value="loadData" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Pagination from '@/components/Pagination/index.vue'
import RightToolbar from '@/components/RightToolbar/index.vue'
import SearchToolbar from '@/components/SearchToolbar/index.vue'
import { listUser } from '@/api/system/user'
import { useAppStore } from '@/store/modules/app'
import type { UserItem, UserQuery } from '@/types'

const { t } = useI18n()
const appStore = useAppStore()
const showSearch = computed(() => appStore.showSearch)

const queryParams = reactive<UserQuery>({
  pageNum: 1,
  pageSize: 2,
  userName: '',
})

const rows = ref<UserItem[]>([])
const total = ref(0)

async function loadData() {
  const response = await listUser(queryParams)
  rows.value = response.rows
  total.value = response.total
}

function handleSearch(keyword: string) {
  queryParams.userName = keyword
  queryParams.pageNum = 1
  void loadData()
}

function handleReset() {
  queryParams.userName = ''
  queryParams.pageNum = 1
  void loadData()
}

onMounted(() => {
  void loadData()
})
</script>

<style scoped lang="scss">
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
}

.page-header__eyebrow {
  margin: 0 0 8px;
  color: #0f766e;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 13px;
}

.table-card {
  padding: 0 20px 12px;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
}

.user-table th,
.user-table td {
  padding: 14px 12px;
  border-bottom: 1px solid #e2e8f0;
  text-align: left;
}
</style>
