
import { useCfStore } from './cf-store'

function UpdateTotalCF(group2: number, totalBalance: number) {

    //const cfStore = useCfStore();
    const { setTotalT1, setTotalT2, setTotalK1, setTotalK2, setTotalK3 } = useCfStore();


    switch (group2) {

        case 8:
            // Handle case for group2 = 8
            // cfStore.setTotalT1(Math.abs(totalBalance))
            // console.log('Total T1:', cfStore.setTotalT1)
            setTotalT1(totalBalance)
            break;
        case 9:
            // Handle case for group2 = 8
            // cfStore.setTotalT2(Math.abs(totalBalance))
            // console.log('Total T2:', cfStore.setTotalT2)
            setTotalT2(totalBalance)
            break;
        case 10:
            // Handle case for group2 = 10
            // cfStore.setTotalK1(Math.abs(totalBalance))
            // console.log('Total T3:', cfStore.setTotalT3)
            setTotalK1(totalBalance)
            break;
        case 11:
            // Handle case for group2 = 11
            // cfStore.setTotalK2(Math.abs(totalBalance))
            // console.log('Total K1:', cfStore.setTotalK1)
            setTotalK2(totalBalance)
            break;
        case 12:
            // Handle case for group2 = 12
            // cfStore.setTotalK3(Math.abs(totalBalance))
            // console.log('Total K2:', cfStore.setTotalK2)
            setTotalK3(totalBalance)
            break;

        default:
            // Handle default case
            break;
    }

    return null;

}

export default UpdateTotalCF