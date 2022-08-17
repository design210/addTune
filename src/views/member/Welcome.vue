<template>
  <div>
    <section class="container-join">
      <div class="bi">
        <router-link to="/main"><img src="@/assets/images/addtune_bi_xs.png" alt="addtune" class="bi" /></router-link>
      </div>
      <div class="info-box">
        <h1 class="mt100">{{ $t("member-welcome-info1") }}</h1>
        <p class="mt50">{{ $t("member-welcome-info2") }}</p>
        <p>{{ $t("member-welcome-info3") }}</p>
        <p>{{ $t("member-welcome-info4") }}</p>
      </div>
      <section class="btn-group">
        <a class="confirm" @click="$router.push('/main')">{{ $t("button-home") }}</a>
      </section>
    </section>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.container-join {
  width: 650px;
  margin: 100px auto 50px;
  & .img-wrap {
    text-align: center;
    margin: 70px 0 50px;
  }
  & .info-box {
    text-align: center;
    color: #747474;
    & h1 {
      font-size: 3rem;
    }
  }
  & .bi {
    text-align: center;
  }
  & .btn-group {
    margin-top: 85px;
    & .confirm {
      background: #ff4d56;
      width: 220px;
      height: 60px;
      text-align: center;
      color: #fff;
      font-size: 2.1rem;
      font-weight: 700;
      line-height: 60px;
      display: block;
      margin: 0 auto;
    }
  }
  & .copyright {
    margin-top: 50px;
    text-align: center;
    color: #747474;
    font-size: 1.5rem;
    & span {
      font-weight: 700;
    }
    & .bi {
      margin-right: 10px;
      height: 15px;
      vertical-align: -2px;
    }
  }
}
</style>
