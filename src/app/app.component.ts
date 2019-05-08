import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { UIService } from "./shared/ui.service";
import { Subscription } from "rxjs";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy{
    @ViewChild(RadSideDrawerComponent) drawerComponent: RadSideDrawerComponent;
    activeChallenge = '';
    private drawerSub: Subscription;
    private drawer: RadSideDrawer;

    constructor(private uiService: UIService, private changeDetectionRef: ChangeDetectorRef){}

    ngOnInit() {
        this.drawerSub = this.uiService.drawerState.subscribe(()=> {
            if(this.drawer){
                this.drawer.toggleDrawerState();
            }

        });

        this.changeDetectionRef.detectChanges();
    }

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer
    }

    onChallengeInput(challengeDescription: string) {
        // this.activeChallenges.push(challengeDescription);
        this.activeChallenge = challengeDescription;
        console.log(challengeDescription);
    }

    onLogout() {
        this.uiService.toggleDrawer();
    }

    ngOnDestroy() {
        if(this.drawerSub) {
            this.drawerSub.unsubscribe();
        }
    }
}
