// Admin panel uchun namunaviy ma'lumotlar — backend ulanmaguncha shu yerda saqlanadi.
// Mavjud yordamchi funksiyalardan (narx formati, buyurtma holati) qayta foydalaniladi.

import { formatSom } from './products'
import { getStatusMeta, getStatusBadgeClass, formatOrderDate } from './orders'
import { regions } from './account'

export { formatSom, getStatusMeta, getStatusBadgeClass, formatOrderDate }

// Platforma bo'yicha umumiy ko'rsatkichlar (namunaviy ro'yxatlardan mustaqil — "1200+ mahsulot"
// kabi kategoriya hisoblagichlari ham asl mahsulotlar ro'yxatidan kattaroq bo'lgani kabi).
export const platformStats = {
  totalUsers: 4820,
  usersDeltaPct: 5.6,
  totalSellers: 186,
  sellersDeltaPct: 3.2,
  totalOrders: 9364,
  ordersDeltaPct: 8.1,
  totalRevenue: 812450000,
  revenueDeltaPct: 12.4,
}

export const revenueTrend = [
  { label: 'Fev', value: 96000000 },
  { label: 'Mar', value: 108500000 },
  { label: 'Apr', value: 121000000 },
  { label: 'May', value: 134800000 },
  { label: 'Iyun', value: 152300000 },
  { label: 'Iyul', value: 99850000 },
]

export const orderStatusBreakdown = [
  { status: 'delivered', count: 6210 },
  { status: 'shipped', count: 1180 },
  { status: 'confirmed', count: 860 },
  { status: 'processing', count: 740 },
  { status: 'cancelled', count: 374 },
]

const USER_STATUS_META = {
  active: { label: 'Faol', tone: 'accent' },
  suspended: { label: 'Bloklangan', tone: 'red' },
}

const SELLER_STATUS_META = {
  pending: { label: 'Kutilmoqda', tone: 'amber' },
  active: { label: 'Faol', tone: 'accent' },
  suspended: { label: 'Bloklangan', tone: 'red' },
  rejected: { label: 'Rad etilgan', tone: 'red' },
}

const TONE_BADGE_CLASSES = {
  amber: 'text-amber-400 bg-amber-400/10',
  sky: 'text-sky-400 bg-sky-400/10',
  indigo: 'text-indigo-400 bg-indigo-400/10',
  accent: 'text-neone-accent bg-neone-accent/10',
  red: 'text-red-400 bg-red-500/10',
}

export function getUserStatusMeta(status) {
  return USER_STATUS_META[status] || USER_STATUS_META.active
}

export function getUserStatusBadgeClass(status) {
  return TONE_BADGE_CLASSES[getUserStatusMeta(status).tone]
}

export function getSellerStatusMeta(status) {
  return SELLER_STATUS_META[status] || SELLER_STATUS_META.pending
}

export function getSellerStatusBadgeClass(status) {
  return TONE_BADGE_CLASSES[getSellerStatusMeta(status).tone]
}

export const mockPlatformUsers = [
  { id: 'usr-2031', firstName: 'Dilnoza', lastName: 'Yusupova', email: 'dilnoza.yusupova@example.com', phone: '+998 90 234 56 78', region: regions[0], joinedAt: '2026-03-14', ordersCount: 12, totalSpent: 3450000, status: 'active' },
  { id: 'usr-2032', firstName: 'Sardor', lastName: 'Aliyev', email: 'sardor.aliyev@example.com', phone: '+998 91 345 67 89', region: regions[5], joinedAt: '2026-01-22', ordersCount: 4, totalSpent: 980000, status: 'active' },
  { id: 'usr-2033', firstName: 'Madina', lastName: 'Nurova', email: 'madina.nurova@example.com', phone: '+998 93 456 78 90', region: regions[2], joinedAt: '2025-11-08', ordersCount: 27, totalSpent: 8120000, status: 'active' },
  { id: 'usr-2034', firstName: 'Otabek', lastName: 'Rashidov', email: 'otabek.rashidov@example.com', phone: '+998 94 567 89 01', region: regions[0], joinedAt: '2026-05-30', ordersCount: 1, totalSpent: 149000, status: 'active' },
  { id: 'usr-2035', firstName: 'Zarina', lastName: 'Qodirova', email: 'zarina.qodirova@example.com', phone: '+998 90 678 90 12', region: regions[6], joinedAt: '2025-09-17', ordersCount: 9, totalSpent: 2340000, status: 'suspended' },
  { id: 'usr-2036', firstName: 'Bekzod', lastName: 'Ergashev', email: 'bekzod.ergashev@example.com', phone: '+998 97 789 01 23', region: regions[1], joinedAt: '2026-06-02', ordersCount: 2, totalSpent: 398000, status: 'active' },
  { id: 'usr-2037', firstName: 'Nilufar', lastName: 'Saidova', email: 'nilufar.saidova@example.com', phone: '+998 88 890 12 34', region: regions[0], joinedAt: '2026-02-11', ordersCount: 15, totalSpent: 4670000, status: 'active' },
  { id: 'usr-2038', firstName: 'Jasur', lastName: 'Tursunov', email: 'jasur.tursunov@example.com', phone: '+998 99 901 23 45', region: regions[3], joinedAt: '2025-12-25', ordersCount: 6, totalSpent: 1580000, status: 'suspended' },
]

export const mockSellers = [
  { id: 'sel-501', businessName: 'Bahor Tekstil', ownerName: 'Kamola Yoqubova', email: 'bahor.tekstil@example.com', phone: '+998 90 111 22 33', region: regions[2], category: 'Ayollar kiyimi', appliedAt: '2026-07-09', productsCount: 0, rating: null, totalSales: 0, status: 'pending' },
  { id: 'sel-502', businessName: 'Poytaxt Sport', ownerName: 'Farrux Norov', email: 'poytaxt.sport@example.com', phone: '+998 91 222 33 44', region: regions[0], category: 'Sport kiyimlar', appliedAt: '2026-07-08', productsCount: 0, rating: null, totalSales: 0, status: 'pending' },
  { id: 'sel-503', businessName: 'Chust Usta Poyabzal', ownerName: 'Shavkat Islomov', email: 'chust.poyabzal@example.com', phone: '+998 93 333 44 55', region: regions[4], category: 'Oyoq kiyim', appliedAt: '2026-07-07', productsCount: 0, rating: null, totalSales: 0, status: 'pending' },
  { id: 'sel-504', businessName: 'Zar Aksessuar', ownerName: 'Gulnora Ahmedova', email: 'zar.aksessuar@example.com', phone: '+998 94 444 55 66', region: regions[0], category: 'Aksessuarlar', appliedAt: '2026-04-19', productsCount: 84, rating: 4.7, totalSales: 62400000, status: 'active' },
  { id: 'sel-505', businessName: 'Vodiy Denim', ownerName: "Ulug'bek Sobirov", email: 'vodiy.denim@example.com', phone: '+998 97 555 66 77', region: regions[9], category: 'Erkaklar kiyimi', appliedAt: '2026-02-05', productsCount: 156, rating: 4.9, totalSales: 118900000, status: 'active' },
  { id: 'sel-506', businessName: 'Aloqa Elektronika', ownerName: 'Davron Xoliqov', email: 'aloqa.elektronika@example.com', phone: '+998 88 666 77 88', region: regions[0], category: 'Aksessuarlar', appliedAt: '2025-10-12', productsCount: 43, rating: 4.3, totalSales: 39750000, status: 'active' },
  { id: 'sel-507', businessName: 'Guliston Bolalar', ownerName: 'Feruza Rahimova', email: 'guliston.bolalar@example.com', phone: '+998 90 777 88 99', region: regions[5], category: 'Bolalar kiyimi', appliedAt: '2025-08-28', productsCount: 61, rating: 3.9, totalSales: 21300000, status: 'suspended' },
  { id: 'sel-508', businessName: "Registon Uy-ro'zg'or", ownerName: 'Anvar Berdiyev', email: 'registon.uy@example.com', phone: '+998 91 888 99 00', region: regions[5], category: "Uy-ro'zg'or buyumlari", appliedAt: '2025-12-01', productsCount: 97, rating: 4.5, totalSales: 54200000, status: 'active' },
]

export const mockPlatformOrders = [
  { id: 'NEONE-71029384', customerName: 'Dilnoza Yusupova', createdAt: '2026-07-10T08:40:00', status: 'processing', itemsCount: 2, total: 298000 },
  { id: 'NEONE-71028871', customerName: 'Sardor Aliyev', createdAt: '2026-07-10T07:15:00', status: 'confirmed', itemsCount: 1, total: 1299000 },
  { id: 'NEONE-71021156', customerName: 'Madina Nurova', createdAt: '2026-07-09T19:20:00', status: 'shipped', itemsCount: 3, total: 547000 },
  { id: 'NEONE-71018842', customerName: 'Nilufar Saidova', createdAt: '2026-07-09T14:05:00', status: 'delivered', itemsCount: 1, total: 249000 },
  { id: 'NEONE-71004417', customerName: 'Bekzod Ergashev', createdAt: '2026-07-08T10:50:00', status: 'delivered', itemsCount: 4, total: 812000 },
  { id: 'NEONE-70998823', customerName: 'Otabek Rashidov', createdAt: '2026-07-08T09:30:00', status: 'cancelled', itemsCount: 1, total: 349000 },
  { id: 'NEONE-70981205', customerName: 'Jasur Tursunov', createdAt: '2026-07-07T16:10:00', status: 'shipped', itemsCount: 2, total: 428000 },
  { id: 'NEONE-70976690', customerName: 'Zarina Qodirova', createdAt: '2026-07-07T11:00:00', status: 'delivered', itemsCount: 1, total: 1299000 },
]

export const recentActivity = [
  { id: 'act-1', text: '"Bahor Tekstil" sotuvchi sifatida ariza topshirdi', at: '2026-07-10T08:15:00' },
  { id: 'act-2', text: "Yangi buyurtma qabul qilindi — NEONE-71029384", at: '2026-07-10T08:40:00' },
  { id: 'act-3', text: '"Guliston Bolalar" do\u2018koni bloklandi (sifat shikoyatlari)', at: '2026-07-09T17:00:00' },
  { id: 'act-4', text: "Nilufar Saidova ro'yxatdan o'tdi", at: '2026-07-09T09:12:00' },
  { id: 'act-5', text: '"Vodiy Denim" 12 ta yangi mahsulot qo\u2018shdi', at: '2026-07-08T15:40:00' },
]
