<template>
    <div class="border border-light px-4 py-2">
        <div class="row">
            <div class="col-9 p-0">
                <div class="name">
                    <span v-show="data.type == 'health'"><i class="fas fa-heart fa-fw"></i></span>
                    <span v-show="data.type == 'test'"><i class="fas fa-moon fa-fw"></i></span>
                    {{data.name}}
                </div>
            </div>
            <div class="col-3 p-0 counter-display flash border border-light text-center">
                <span class="text-center counter-digits">{{displayCount}}</span>
            </div>
        </div>
        <div class="row mt-2">
            <div class="col-3">
                <button class="btn btn-lg btn-outline-light btn-block" @click="count = startValue">
                    <i class="fas fa-undo fa-fw"></i>
                </button>
            </div>
            <div class="col-4 offset-1">
                <button class="btn btn-lg btn-outline-light btn-block" @click="count++">
                    <i class="fas fa-plus fa-fw"></i>
                </button>
            </div>
            <div class="col-4">
                <button class="btn btn-lg btn-outline-light btn-block" @click="count--">
                    <i class="fas fa-minus fa-fw"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {counterData} from './models/counterData';

export default {
    props: {
        data: {
            required: true,
            type: counterData
        }
    },
    data() {
        return {
            count: this.data.value,
            startValue: this.data.value,
        }
    },
    computed: {
        displayCount() {
            if(this.count < 10 && this.count >= 0) {
                return '0' + this.count.toString();
            }
            else {
                return this.count.toString();
            }
        }
    },
    watch: {
        data() {
            this.count = this.data.value;
        },
        count() {
            this.$emit('counterChanged', {id: this.data.id, value: this.count});
        }
    }
}   
</script>

<style lang="less" scoped>

.name {
    font-size: 2em;
}

.counter-display {
    font-family: LCD;
    font-size: 3em;
    background-color: black;
    color: lime;
    letter-spacing: 8px;
}

.counter-digits {
    margin-left: 9px;
}

</style>
