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
    'text!./drop-zone.html',
    './drop-zone.controller'
  ],
  function(dropZoneTemplate, dropZoneController) {
    var options = {
        bindings: {
            // Inputs
            dropZone: '<',

            // Outputs
            onDrop: '&',
            onDragover: '&',
            onDragStart: '&',
            onDragStop: '&',
            onRemove: '&'
          },
      template: dropZoneTemplate,
      controller: dropZoneController
    };

    return {
      name: "dropZone",
      options: options
    };
  }
);