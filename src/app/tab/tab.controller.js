/*!
* Copyright 2016 Pentaho Corporation. All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

define(
  [
    './utils/utils-mock.service'
  ],
  function(MockService) {
    'use strict';

    TabController.$inject = ["$element", "MockService"];
    function TabController($element, MockService) {


      function getFields() {
        return MockService.getFields();
      }

      function getCategories() {
        return MockService.getCategories();
      }

      function getDropZones() {
        return MockService.getDropZones();
      }

      function onFieldSelected(field) {
        MockService.fieldSelected(field);
      }

      function onDragStart(field) {
        console.log("Drag started >", field);
        MockService.dropZoneDropActive(field, true);
        event.dataTransfer.setData("fieldId", field.id);
      }

      function onDragStop(field) {
        console.log("Drag stopped >", field);
        MockService.dropZoneDropActive(field, false);
      }

      function onDragZoneStart(zoneId, field) {
        console.log("Drag Zone started > zone ", zoneId, " field ", field);
        MockService.dropZoneDropActive(field, true);
        event.dataTransfer.setData("fieldId", field.id);
        event.dataTransfer.setData("srcZoneId", zoneId);
      }

      function onDragZoneStop(zoneId, field) {
        console.log("Drag Zone stopped > zone ", zoneId, " field ", field);
        MockService.dropZoneDropActive(field, false);
      }

      function onRemove(dropZoneId, fieldId) {
        MockService.dropZoneFieldRemove(dropZoneId, fieldId);
      }

      function onDrop(dropZoneId) {
        var fieldId = event.dataTransfer.getData("fieldId");
        var srcZoneId = event.dataTransfer.getData("srcZoneId");
        console.log("FieldId: " + fieldId + " was dropped on dropzone >", dropZoneId);

        if(srcZoneId && srcZoneId != dropZoneId) {
          MockService.dropZoneFieldAdd(dropZoneId, fieldId);
          MockService.dropZoneFieldRemove(srcZoneId, fieldId);
        }
        else {
          MockService.dropZoneFieldAdd(dropZoneId, fieldId);
        }
      }

      function onDragover(dropZone) {
        if(dropZone.maxFields > dropZone.currentFields.length) {
          event.preventDefault();
        }
      }

      return {

        fields: getFields(),
        categories: getCategories(),
        dropZones: getDropZones,
        onFieldSelected: onFieldSelected,
        onDragStart: onDragStart,
        onDragStop: onDragStop,
        onDragZoneStart: onDragZoneStart,
        onDragZoneStop: onDragZoneStop,
        onRemove: onRemove,
        onDrop: onDrop,
        onDragover: onDragover
      }
    }

    return TabController;
  }
);
