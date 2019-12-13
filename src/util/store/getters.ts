import Types from './type'
import { GetterTree } from 'vuex';
import State from './state';
const getters: GetterTree<Types, any> = {
	control: (state: Types) => state.control
}
export default getters;
