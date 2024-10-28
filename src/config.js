// next.config.js


module.exports = global.config = {
    apiUrl: process.env.API_URL,
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    i18n: {
        welcome: {
            en: "Welcome",
            fa: "خوش آمدید",
            id: "Selamat Datang"
        }
        // rest of your translation object
    },
    pageInfo: {
        headerText: 'GDPSApp',
        footerText: '© GDPS 2024',
        loadingText: 'Sedang memuat data...',
        infoNeracaBalance: 'Neraca Seimbang',
        infoNeracaUnbalance: 'Neraca Belum Seimbang',

    }
    // other global config variables you wish
};