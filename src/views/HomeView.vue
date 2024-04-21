<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import sessionMiddleware from '../middleware/session'

const router = useRouter()

function onGetStarted() {
    router.push('/notes')
}

onMounted(async () => {
    const session = await sessionMiddleware.getCurrentSession()
    if (session === null) {
        return
    }
    router.push('/notes')
})
</script>

<template>
    <div class="main-container">
        <div class="header-container">
            <img class="logo-picture" src="../assets/TheNotesLogo.png" />
        </div>
        <div class="content-container">
            <div class="bla">
                <div class="landing-slogan-container">
                    <div class="slogan">
                        <div>
                            <h2 class="slogan-h2">
                                <!-- Create. Update. Delete. Notes... -->
                                Secoority. Hoomanity. Notes...
                            </h2>
                        </div>
                        <div>
                            <h1 class="slogan-h1">TheNotes</h1>
                        </div>
                    </div>
                    <div class="get-started">
                        <button
                            class="get-started-button"
                            @click="onGetStarted()"
                        >
                            Get started
                        </button>
                    </div>
                </div>
                <div class="landing-girl-with-ideas">
                    <img src="../assets/girl with ideas.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.get-started {
    padding-left: 5rem;
}
.get-started-button {
    /* background-color: rgb(231, 231, 231);
    color: rgb(51, 51, 51);
    border: 2px solid rgba(51, 51, 52, 0.601); */
    background-color: rgb(51, 51, 51);
    color: rgb(231, 231, 231);
    border: 2px solid rgba(231, 231, 231, 0.601);
    padding: 0.8rem 1.6rem;
    font-size: 1.5rem;
    border-radius: 5px;
    cursor: pointer;
}

.slogan-h1,
.slogan-h2 {
    margin-bottom: 0;
    margin-top: 0.5rem;
    padding-right: 1.5em;
}

.slogan-h1 {
    font-weight: 700;
    font-style: italic;
}

.slogan {
    padding-top: 7rem;
    width: 100%;
    display: flex;
    align-items: end;
    flex-direction: column;
}

.bla {
    /* border: 2px solid yellow; */
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding-left: 1.5rem;
}

.landing-slogan-container {
    /* border: 1px solid black; */
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
}

.landing-girl-with-ideas {
    /* border: 1px solid red; */
    height: 20rem;
    padding-right: 4rem;
}

.landing-girl-with-ideas img {
    height: 100%;
}

.header-container {
    width: 100%;
    z-index: 10;
    align-items: left;
    display: flex;
    overflow: hidden;
}

.logo-picture {
    height: 6rem;
    margin-left: 0.5rem;
}

.content-container {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: absolute;
    top: 0;
    left: 0;
}

.main-container {
    height: 100vh;
}
</style>
