<template>
    <el-footer class="w-full">
      <div class="bottomBox">
        <p>
            <span>版权所有：浙江浙勤集团有限公司</span>
            <span>浙IOO备001xxx023号</span>
        </p>
        <p>
            <span>
            公司地址：杭州市西湖区保俶路222号&nbsp;&nbsp;&nbsp;&nbsp;
            公司传真：0571-66343343&nbsp;&nbsp;&nbsp;&nbsp;
            联系电话：0571-66343343</span>
        </p>
      </div>
    </el-footer>
</template>

<style lang="scss">

.bottomBox{
    padding: 10px;
    text-align:center;
    background: #666;
}
.bottomBox>p{
    height: 30px;
    line-height: 30px;
}
.bottomBox>p>span{
    color: #f2f2f2;
    font-size: 13px;
    padding: 0 16px 0px 20px;
}
.bottomBox>p>span:first-child~span{
    border-left: 2px solid #f2f2f2;
}
</style>