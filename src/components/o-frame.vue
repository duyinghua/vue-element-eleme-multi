<template>
    <div>
        <o-header></o-header>
        <div class="container">
            <el-row class="body" :gutter="20">
                <el-col :span="3">
                    <o-sider></o-sider>
                </el-col>
                <el-col :span="21">
                    <div class="grid-content bg-purple-light">
                        <slot>
                            只有在没有要分发的内容时才会显示。
                        </slot>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import oHeader from '../components/o-header.vue'
    import oSider from '../components/o-sider.vue'

    export default {
        components: {oHeader, oSider}
    }
</script>

<style>

</style>
