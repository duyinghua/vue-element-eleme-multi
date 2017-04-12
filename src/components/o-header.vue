<template>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <div class="container">
            <el-col :span="3">
                &nbsp;
            </el-col>
            <el-col :span="21">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-submenu index="2">
                    <template slot="title">我的工作台</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                </el-submenu>
                <el-menu-item index="3"><a href="/pages/a.html">订单管理</a></el-menu-item>
            </el-col>
        </div>
    </el-menu>
</template>

<script type="text/ecmascript-6">
    export default {
        data: function () {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect: function (key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>

</style>
