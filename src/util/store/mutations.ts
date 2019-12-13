import Types from "./type";
const mutations = {
	SETSTATE(state: Types, control: boolean) {
		state.control = control;
	},
	borderClick(state: Types, borderClick: number){
		if(borderClick == 2){
			state.clickCount++;
		}
		state.borderClick = borderClick;
	}

};
export default mutations;
