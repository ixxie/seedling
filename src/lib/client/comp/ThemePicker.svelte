<script lang="ts">
    let theme = $state('system');
    let cachedTheme: string;

    const themes = [
        {value: 'system', 'icon': '--app-window-icon'},
        {value: 'light', 'icon': '--sun-icon'},
        {value: 'dark', 'icon': '--moon-icon'},
    ]

    $effect(() => {
        const cachedTheme = localStorage.getItem('theme');
        if (cachedTheme) {
            document.documentElement.dataset['theme'] = cachedTheme;
        }
        if ( document.getElementById('theme-picker')) {
            theme = cachedTheme ?? 'system';
        }
    });

    $effect(() => {
        const themePicker = document.getElementById('theme-picker');
        // set theme ba
        if (themePicker) {
            if (theme === 'system') {
                delete document.documentElement.dataset['theme'];
                localStorage.removeItem('theme');
            } else {
                document.documentElement.dataset['theme'] = theme;
                localStorage.setItem('theme', theme);
            }
        }
    });

</script>

<fieldset id="theme-picker">
    <legend>Theme:</legend>
    {#each themes as {value, icon}}
        {@const title = `${value.charAt(0).toUpperCase() + value.slice(1)} theme`}
        <label>
            <input name="theme" type="radio" {value} bind:group={theme} {title}>
            <span
                {title}
                class="icon"
                style="
                    --icon: var({icon});
                    --icon-color: lch(50% var(--primary) / {value == theme ? '100%' : '30%'});
                "
            >
            </span>
        </label>
    {/each}
</fieldset>

<style>
    fieldset {
        flex-flow: row nowrap;
        border: none;
    }

    legend, input {
        display: none;
    }

    label {
        padding: 0;
        position: relative;
    }
</style>

<svelte:head>
    <noscript>
        <style>
            #theme-picker {
              display: none;
            }
          </style>
    </noscript>
</svelte:head>
