import { createMachine } from "xstate";

/**
 * status:
 *   pending
 *   in_progress
 *   paid
 *   completed
 */

const OrderMachine = createMachine({
    id: 'Order',
    initial: 'pending',
    states: {
        pending: {
            on: {
                IN_PROGRESS: {
                    target: 'in_progress',
                    actions: ''
                }
            }
        },
        in_progress: {
            on: {
                PAID: {
                    target: 'paid',
                    actions: ''
                }
            }
        },
        paid: {
            on: {
                COMPLETED: {
                    target: 'completed',
                    actions: ''
                }
            }
        },
        completed: {
            on: {}
        },
    }
}, {
    actions: {
        setAnimations: (context, event) {
            console.log(event);
        }
    }
})