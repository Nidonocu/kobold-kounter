<template>
    <div class="container-fluid">
        <div class="row m-5">
            <div class="col">
                <button class="btn btn-lg btn-outline-light" @click="createNewCounter">Create Counter</button>
                <button class="btn btn-lg btn-outline-light" @click="deleteCounter">Delete Counter</button>
                <button class="btn btn-lg btn-outline-light" @click="saveCounters">Save Counters</button>
                <button class="btn btn-lg btn-outline-light" @click="loadCounters">Load Counters</button>
                {{saveStatus}}
            </div>
        </div>
        <div class="row m-4">
            <div class="col-4" v-for="counter in counters" :key="counter.id">
                <counter :data="counter" @counterChanged="updateValues"></counter>
            </div>
        </div>
        <!-- 
        Counter App:
        * Combat Turn
        * Player:
        Weapon Magazine Status
        * NPC:
        HP
        Armour HP
        Weapon HP
        Shield
        * NPC Ship:
        HP
        Shield
        Pilot HP
        * Action Turn Counter
        * Chase Counter-->
    </div>
</template>

<script>
import Counter from './Counter.vue';
import {counterData} from './models/counterData';

const storage = require('electron-json-storage');
//const electron = require('electron');

export default {
    components: {
        Counter
    },
    data () {
        return {
            counters: [],
            saveStatus: 'Ready'
        }
    },
    mounted() {
        
    },
    methods: {
        createNewCounter() {
            this.counters.push(new counterData({
                id: this.counters.length + 1,
                name: 'Test Counter',
                value: 1,
                type: 'test'
            }));
            this.saveStatus = 'Changes Pending';
        },
        deleteCounter() {
            this.counters.pop();
            this.saveStatus = 'Changes Pending';
        },
        saveCounters() {
            //let path = electron.remote.app.getPath('userData');
            this.saveStatus = 'Saving';
            storage.set('counters', this.counters, (error) => {
                if (error) throw error;
                else this.saveStatus = 'Saved';
            });
        },
        loadCounters() {
            this.saveStatus = 'Loading';
            storage.has('counters', (error, hasKey) => {
                if (error) throw error;
                if (hasKey) {
                    storage.get('counters', (error, data) => {
                        if (error) throw error;
                        else {
                            let dataArray = Object.keys(data).map(function (key) { return data[key]; });
                            this.counters = [];
                            dataArray.forEach(counter => {
                                this.counters.push(new counterData(counter));
                            });
                        }
                        this.saveStatus = 'Loaded';
                    });
                }
                else {
                    this.saveStatus = 'No Data';
                }
            });
        },

        updateValues(data) {
            let targetIndex = this.counters.findIndex((counter) => counter.id === data.id);
            this.counters[targetIndex].value = data.value;
            this.saveStatus = 'Changes Pending';
        }
    }
}
</script>

<style lang="less" scoped>

</style>