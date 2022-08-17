<template>
  <modalWrap @close="close">
    <template slot="head">
      <h1>{{ $t("modal-hpModify") }}</h1>
    </template>
    <template slot="body">
      <div>
        <input type="text" v-model="buyAdvertisingProductVideoHp" maxlength="13" />
      </div>
    </template>
    <template slot="footer">
      <div class="btn-wrap">
        <button @click="save" :disabled="data.disabled">{{ $t("button-save") }}</button>
      </div>
    </template>
  </modalWrap>
</template>

<script>
import modalWrap from "@/components/modal/ModalTemplate";
import HpNum from "@/utils/HpNum";
import { ref, watch, reactive, computed, getCurrentInstance } from "@vue/composition-api";
import bus from "@/utils/bus";
import loading from "@/mixins/loading";
export default {
  components: {
    modalWrap,
  },
  mixins: [loading],
  props: ["id"],
  setup() {
    return {
      ...modify(),
    };
  },
};
function modify() {
  const vm = getCurrentInstance();
  const _this = vm.proxy;
  const buyAdvertisingProductVideoHp = ref("");
  const data = reactive({
    buySid: vm.props.id,
    disabled: true,
  });
  const close = () => {
    vm.emit("close");
  };
  const modify = computed(() => _this.$store.getters["product/hpModify"]);
  const save = async () => {
    try {
      bus.$emit("start:spinner");
      await _this.$store.dispatch("product/HP_MODIFY", {
        buyAdvertisingProductVideoHp: buyAdvertisingProductVideoHp.value,
        id: data.buySid,
      });
      if (modify.value.addtuneApiResult.errorCode == 200) {
        alert(_this.$t("alert-t15"));
        vm.attrs.update(modify.value.addtuneApiResult.updatePhone);
        close();
      } else {
        alert(modify.value.addtuneApiResult.errorMessage);
      }
    } catch (error) {
      alert(error);
    } finally {
      bus.$emit("end:spinner");
    }
  };
  watch(buyAdvertisingProductVideoHp, num => {
    buyAdvertisingProductVideoHp.value = HpNum(num);
    num !== "" ? (data.disabled = false) : (data.disabled = true);
  });
  return { data, close, save, buyAdvertisingProductVideoHp };
}
</script>
<style lang="scss" scoped>
h1 {
  @include NotoSans(3, 700, #333333);
  text-align: center;
  margin-top: 50px;
}
.comment {
  @include NotoSans(1.7, 400, #333333);
}
input {
  @include NotoSans(1.6, 400, #333333);
  &::placeholder {
    @include NotoSans(1.6, 400, #bdbdbd);
  }
  border: 1px solid #c4c4c4;
  height: 50px;
  padding: 0 20px;
  width: 100%;
  margin-top: 10px;
}
.btn-wrap {
  text-align: center;
  margin-top: 35px;
  margin-bottom: 50px;
  & button {
    width: 250px;
    height: 70px;
    background: #ff4d56;
    border-radius: 2px;
    @include NotoSans(2, 700, #fff);
    &:disabled {
      background: #828282;
    }
  }
}
</style>
