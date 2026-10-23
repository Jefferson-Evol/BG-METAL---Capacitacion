/**
 * @NApiVersion 2.1
 * @NScriptType ClientScript
 * @NModuleScope SameAccount
 *
 * @project     BG Metal Trade (PP631-1093)
 * @object      customscript_ts_cs_pa_trd_tm_proy
 * @type        Client Script
 * @author      EVOL
 * @version     1.0
 * @description Sincroniza TM PROY (custcol_bg_tm_proy) con la Cantidad de la
 *              línea en Orden de Compra y Orden de Venta.
 *
 *              Hallazgo GAP (BGM-26-008-REP, Cuadro Transversal de Facturas,
 *              campo TM PROY): el campo a nivel de línea "TM Proy" está vacío
 *              en OC/OV y no existe ningún desarrollo que lo llene - no es un
 *              bug de un [CS] preexistente roto, es un desarrollo nuevo.
 *              Confirmado por Daniel Chipana (chat, ver evidencia adjunta):
 *              "debe heredar lo que el usuario ponga en quantity" / "de la
 *              misma línea".
 *
 *              Deployment necesario en AMBOS: Purchase Order y Sales Order.
 */
define([], function () {

    const SUBLIST_ITEM = 'item';
    const FIELD_CANTIDAD = 'quantity';
    const FIELD_TM_PROY = 'custcol_bg_tm_proy';

    const fieldChanged = (context) => {
        if (context.sublistId !== SUBLIST_ITEM || context.fieldId !== FIELD_CANTIDAD) {
            return;
        }

        var cantidad = context.currentRecord.getCurrentSublistValue({
            sublistId: SUBLIST_ITEM,
            fieldId: FIELD_CANTIDAD
        });

        context.currentRecord.setCurrentSublistValue({
            sublistId: SUBLIST_ITEM,
            fieldId: FIELD_TM_PROY,
            value: cantidad,
            ignoreFieldChange: true
        });
    };

    return {
        fieldChanged
    };

});
