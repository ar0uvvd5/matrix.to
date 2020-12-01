/*
Copyright 2020 The Matrix.org Foundation C.I.C.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import {isWebPlatform, Platform} from "./Platform.js";
import {ClientViewModel} from "./ClientViewModel.js";
import {ViewModel} from "../utils/ViewModel.js";

export class ClientListViewModel extends ViewModel {
	constructor(options) {
		super(options);
		const {clients, client, link} = options;
		this.clientList = clients.map(client => new ClientViewModel(this.childOptions({
			client,
			link,
			pickClient: client => this._pickClient(client)
		})));
		this.clientViewModel = null;
		if (client) {
			this._pickClient(client);
		}
	}

	_pickClient(client) {
		this.clientViewModel = this.clientList.find(vm => vm.clientId === client.id);
		this.emitChange();
	}

	showAll() {
		this.clientViewModel = null;
		this.emitChange();
	}
}
