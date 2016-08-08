define(["utils/utils","mvc/ui/ui-misc","mvc/ui/ui-modal","mvc/tool/tool-form-base"],function(a,b,c,d){var e=d.extend({initialize:function(e){var f=this;e.listen_to_history=!0,e.always_refresh=!1,this.modal=parent.Galaxy.modal||new c.View,d.prototype.initialize.call(this,a.merge({customize:function(a){a.buttons={execute:execute_btn=new b.Button({icon:"fa-check",tooltip:"Execute: "+a.name+" ("+a.version+")",title:"Execute",cls:"ui-button btn btn-primary",floating:"clear",onclick:function(){execute_btn.wait(),f.portlet.disable(),f.submit(a,function(){execute_btn.unwait(),f.portlet.enable()})}})},a.job_id&&a.job_remap&&(a.inputs.rerun_remap_job_id={label:"Resume dependencies from this job",name:"rerun_remap_job_id",type:"select",display:"radio",ignore:"__ignore__",value:"__ignore__",options:[["Yes",a.job_id],["No","__ignore__"]],help:"The previous run of this tool failed and other tools were waiting for it to finish successfully. Use this option to resume those tools using the new output(s) of this tool run."})}},e))},submit:function(b,c){var d=this,e={tool_id:b.id,tool_version:b.version,inputs:this.data.create()};if(this.trigger("reset"),!d.validate(e))return Galaxy.emit.debug("tool-form::submit()","Submission canceled. Validation failed."),void(c&&c());if(b.action!==Galaxy.root+"tool_runner/index"){var f=$("<form/>").attr({action:b.action,method:b.method,enctype:b.enctype});return _.each(e.inputs,function(a,b){f.append($("<input/>").attr({name:b,value:a}))}),f.hide().appendTo("body").submit().remove(),void(c&&c())}Galaxy.emit.debug("tool-form::submit()","Validation complete.",e),a.request({type:"POST",url:Galaxy.root+"api/tools",data:e,success:function(a){c&&c(),d.$el.children().hide(),d.$el.append(d._templateSuccess(a)),parent.Galaxy&&parent.Galaxy.currHistoryPanel&&parent.Galaxy.currHistoryPanel.refreshContents()},error:function(a){c&&c(),Galaxy.emit.debug("tool-form::submit","Submission failed.",a);var b=!1;if(a&&a.err_data){var f=d.data.matchResponse(a.err_data);for(var g in f){d.highlight(g,f[g]),b=!0;break}}b||d.modal.show({title:"Job submission failed",body:a&&a.err_msg||d._templateError(e),buttons:{Close:function(){d.modal.hide()}}})}})},validate:function(a){var b=a.inputs,c=-1,d=null;for(var e in b){var f=b[e],g=this.data.match(e),h=this.field_list[g],i=this.input_list[g];if(g&&i&&h){if(!i.optional&&null==f)return this.highlight(g),!1;if(f&&f.batch){var j=f.values.length,k=j>0&&f.values[0]&&f.values[0].src;if(k)if(null===d)d=k;else if(d!==k)return this.highlight(g,"Please select either dataset or dataset list fields for all batch mode fields."),!1;if(-1===c)c=j;else if(c!==j)return this.highlight(g,"Please make sure that you select the same number of inputs for all batch mode fields. This field contains <b>"+j+"</b> selection(s) while a previous field contains <b>"+c+"</b>."),!1}}else Galaxy.emit.debug("tool-form::validate()","Retrieving input objects failed.")}return!0},_templateSuccess:function(a){if(a.jobs&&a.jobs.length>0){var b=a.jobs.length,c=1==b?"1 job has":b+" jobs have",d=$("<div/>").addClass("donemessagelarge").append($("<p/>").text(c+" been successfully added to the queue - resulting in the following datasets:"));return _.each(a.outputs,function(a){d.append($("<p/>").addClass("messagerow").append($("<b/>").text(a.hid+": "+a.name)))}),d.append($("<p/>").append("<b/>").text("You can check the status of queued jobs and view the resulting data by refreshing the History pane. When the job has been run the status will change from 'running' to 'finished' if completed successfully or 'error' if problems were encountered.")),d}return this._templateError(a)},_templateError:function(a){return $("<div/>").addClass("errormessagelarge").append($("<p/>").text("The server could not complete the request. Please contact the Galaxy Team if this error persists.")).append($("<pre/>").text(JSON.stringify(a,null,4)))}});return{View:e}});
//# sourceMappingURL=../../../maps/mvc/tool/tool-form.js.map