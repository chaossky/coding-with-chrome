/**
 * @fileoverview Renderer for Python.
 *
 * @license Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author mbordihn@google.com (Markus Bordihn)
 */
goog.provide('cwc.renderer.external.Python');

goog.require('cwc.file.ContentType');
goog.require('cwc.file.Files');
goog.require('cwc.framework.External');
goog.require('cwc.renderer.Helper');
goog.require('cwc.utils.Helper');


/**
 * @constructor
 * @param {!cwc.utils.Helper} helper
 * @struct
 * @final
 */
cwc.renderer.external.Python = function(helper) {
  /** @type {!cwc.utils.Helper} */
  this.helper = helper;
};


/**
 * Initializes and defines the simple renderer.
 */
cwc.renderer.external.Python.prototype.init = function() {
  let rendererInstance = this.helper.getInstance('renderer', true);
  let renderer = this.render.bind(this);
  rendererInstance.setRenderer(renderer);
};


/**
 * @param {Object} editor_content
 * @param {Object} editor_flags
 * @param {!cwc.file.Files} library_files
 * @param {!cwc.file.Files} frameworks
 * @param {cwc.renderer.Helper} renderer_helper
 * @return {!string}
 * @export
 */
cwc.renderer.external.Python.prototype.render = function(
    editor_content,
    editor_flags,
    library_files,
    frameworks,
    renderer_helper) {
  let python = editor_content[cwc.file.ContentType.PYTHON];
  let header = renderer_helper.getFrameworkHeaders([
    cwc.framework.External.JQUERY.V2_2_4,
    cwc.framework.External.SKULPT.CORE,
    cwc.framework.External.SKULPT.STDLIB,
    cwc.framework.Internal.PYTHON,
  ], frameworks);
  let body = '<div id="content"></div>' +
  '<script id="code" type="text/python">\n' + python + '\n</script>' +
  '<script>new cwc.framework.Python().run();</script>';

  return renderer_helper.getHTMLCanvas(body, header);
};
