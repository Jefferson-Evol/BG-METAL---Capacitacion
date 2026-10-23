
/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 */
define(['N/ui/dialog', 'N/search'], (dialog, search) => {

    const pageInit = (context) => {


            try {

                const currentRecord = context.currentRecord;
                        
                console.log('Client Script ejecutado');
                console.log('Modo:', context.mode);



                if(context.mode === 'create'){
                    mostraMensaje('Client Script', 'Estás en modo de CREACION.');
                }


                if(context.mode === 'edit'){
                    mostraMensaje('Client Script', 'Estás en modo de EDICION.');
                }


                if(context.mode === 'view'){
                    mostraMensaje('Client Script', 'Estás en modo de VISUALIZACION.');
                }


                if(context.mode === 'copy'){
                    mostraMensaje('Client Script', 'Estás en modo de COPIA.');
                }



                    // Deshabilitar el campo "phone"
                disabledFields(currentRecord, 'phone');

                // Ocultar el campo "email"
                hideFields(currentRecord, 'email');


            } catch (error) {
                dialog.alert({
                    title: 'Error',
                    message: error.message
                });
            }





    };



    const fieldChanged = (context) => {

        try {

            const currentRecord = context.currentRecord;

            const fieldId = context.fieldId;


            console.log('Campo cambiado:', fieldId);


            if (fieldId !== 'salesrep') {
                return;
            }


            const salesRepValue = currentRecord.getValue({
                fieldId: 'salesrep'
            });


            console.log('Valor del campo salesrep:', salesRepValue);


            if(!salesRepValue){
                console.log('El campo "salesrep" está vacío. Por favor, selecciona un valor.');
                return 

            }

            const salesRepData = search.lookupFields({
                type: search.Type.EMPLOYEE,
                id: salesRepValue,
                columns: ['entityid', 'email', 'phone']
            });


            console.log('Datos del representante de ventas:', salesRepData);



        }catch (error) {
            dialog.alert({
                title: 'Error',
                message: error.message
            });
        }



    }





    const  mostraMensaje = (title, message) => {
        dialog
        .alert({
            title: title,
            message: message
        })
        .catch((error) => {
            console.error('Error al mostrar el mensaje:', error);
        });

    }



    const disabledFields = (currentRecord, fieldId) => {

        try{

            const field = currentRecord.getField({
                fieldId: fieldId
            });


            if (field) {
                field.isDisabled = true;
                console.log(`El campo ${fieldId} ha sido deshabilitado.`);
            }



        }catch(error){
            dialog.alert({
                title: 'Error',
                message: error.message
            });
        }


    }



    const hideFields = (currentRecord, fieldId) => {



        try{


              const field = currentRecord.getField({
                fieldId: fieldId
            });


            if (field) {
                field.isDisplay = false;
                console.log(`El campo ${fieldId} ha sido ocultado.`);
            }




        }catch(error){
            dialog.alert({
                title: 'Error',
                message: error.message
            });
        }
    }
    
    return {
        pageInit, 
        fieldChanged
    };
});
