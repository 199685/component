

Vue.component('County', {
    template: "#CountyTemplate",
    props: ['item', 'star'],
    methods: {
        folower: function () {
            this.$emit('touch', this.item.SiteName)
        }

    },
    computed: {
        Color: function () {
            switch (this.item.Status) {
                case "普通":
                    return "status-aqi2";
                case "對敏感族群不健康":
                    return "status-aqi3";
                case "對所有族群不健康":
                    return "status-aqi4";
                case "非常不健康":
                    return "status-aqi5";
                case "危害":
                    return "status-aqi6";
            }
        },
        starStyle: function () {

            if (this.star.includes(this.item.SiteName)) {
                return "fas fa-star"
            } else {
                return "far fa-star"
            }
        }
    }
})

// API 來源
// https://opendata.epa.gov.tw/Data/Contents/AQI/

var app = new Vue({
    el: '#app',
    data: {
        data: [],
        location: [],
        stared: JSON.parse(localStorage.getItem('listdata')) || [],
        filter: '',

    },
    // 請在此撰寫 JavaScript
    methods: {
        getData() {
            const vm = this;
            const api = 'http://opendata2.epa.gov.tw/AQI.json';

            // 使用 jQuery ajax
            $.get(api).then(function (response) {
                vm.data = response;
            });
        },
        folower: function (item) {


            if (this.stared.indexOf(item) < 0) {
                this.stared.push(item)
            } else {
                let index = this.stared.findIndex(data => item === data)
                this.stared.splice(index, 1)
            }
            localStorage.setItem('listdata', JSON.stringify(this.stared))
        }
    },
    created() {
        this.getData();
    },
    computed: {
        filterData: function () {
            let SelectData = [];
            this.data.forEach(item => {
                if (SelectData.indexOf(item.County) < 0) {
                    SelectData.push(item.County)
                }
            })
            return SelectData
        },
        filterCounty: function () {
            if (this.filter !== '') {
                return this.data.filter(item => item.County === this.filter)
            }
            return this.data

        },
        locationData: function () {
            return this.location = this.data.filter(item => this.stared.indexOf(item.SiteName) > -1)

        }
    },


});
