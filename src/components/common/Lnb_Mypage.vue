<template>
  <div class="lnb-wrap">
    <div class="lnbs">
      <h1>{{ $t("mypageLnb-title") }}</h1>
      <ul>
        <li>
          <router-link to="/mypage/myinfo">{{ $t("mypageLnb-menu1") }}</router-link>
        </li>
        <li>
          <router-link to="/mypage/purchase">{{ $t("mypageLnb-menu2") }}</router-link>
        </li>
        <li>
          <router-link to="/mypage/adContents">{{ $t("mypageLnb-menu3") }}</router-link>
        </li>
        <li>
          <router-link to="/mypage/alimSettings">{{ $t("mypageLnb-menu4") }}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.lnb-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  & .lnbs {
    & h1 {
      @include NotoSans(2.5, 700, #000);
      margin-bottom: 38px;
    }
    & ul {
      margin: 0 !important;
      padding: 0 !important;
      & li {
        margin: 0 0 15px 0 !important;
        padding: 0 !important;
        @include NotoSans(1.8, 400, #828282);
        & a {
          color: #828282;
          &.router-link-active {
            color: #ff4d56;
            font-weight: 700;
          }
        }
      }
    }
  }
}
</style>
