import { createMachine, interpret } from "xstate";

/**
 * status:
 *   pending
 *   in_progress
 *   paid
 *   completed
 */

const OrderMachine = createMachine({
    id: 'Order',
    predictableActionArguments: true,
    initial: 'pending',
    context: {
        description: 'extended states'
    },
    states: {
        pending: {
            on: {
                IN_PROGRESS: {
                    target: 'in_progress',
                    actions: 'setSuccessful'
                },
                PAID: {
                    actions: 'setFailed'
                }
            }
        },
        in_progress: {
            on: {
                PAID: {
                    target: 'paid',
                    actions: 'setSuccessful'
                },
                PENDING: {
                    actions: 'setFailed'
                }
            }
        },
        paid: {
            on: {
                COMPLETED: {
                    target: 'completed',
                    actions: 'setSuccessful'
                },
                IN_PROGRESS: {
                    actions: 'setFailed'
                },
                PENDING: {
                    actions: 'setFailed'
                }
            }
        },
        completed: {
            type: 'final'
        },
    }
}, {
    actions: {
        setSuccessful: (context, event) => {
            console.log({
                context,
                sucessful: true,
                event
            });
        },
        setFailed: (context, event) => {
            console.log({
                context,
                sucessful: false,
                event
            });
        },
    }
});

const OrderService = interpret(OrderMachine).onTransition((state) => {
    console.log(`Current State: ${state.value}`);
    if (state.value === 'in_progress') {
        console.log({
            state
        });
    }
});

OrderService.start();
OrderService.send({ type: 'IN_PROGRESS' });
OrderService.send({ type: 'PENDING' });
OrderService.send({ type: 'PAID' });
OrderService.send({ type: 'COMPLETED' });
OrderService.send({ type: 'IN_PROGRESS' });
