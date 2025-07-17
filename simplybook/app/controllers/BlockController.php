<?php namespace SimplyBook\Controllers;

use SimplyBook\App;
use SimplyBook\Interfaces\ControllerInterface;

class BlockController implements ControllerInterface
{
    public function register()
    {
        if (!function_exists('register_block_type')) {
            // Block editor is not available.
            return;
        }

        add_action('enqueue_block_editor_assets', [$this, 'enqueueBlockEditorAssets']);
        add_action('init', [$this, 'registerBlockType']);
    }

    /**
     * Register the SimplyBook Widget block
     */
    public function registerBlockType()
    {
        register_block_type('simplybook/widget', [
            'title' => 'SimplyBook Widget',
            'icon' => 'simplybook',
            'category' => 'widgets',
            'render_callback' => [$this, 'addWidgetBlock'],
            'attributes' => [
                'location' => [
                    'type' => 'integer',
                    'default' => 0
                ],
                'category' => [
                    'type' => 'integer',
                    'default' => 0
                ],
                'provider' => [
                    'type' => 'string', // Provider ID can be a sting like "any"
                    'default' => '0'
                ],
                'service' => [
                    'type' => 'integer',
                    'default' => 0
                ],
            ],
        ]);
    }

    /**
     * Enqueue the block editor assets
     */
    public function enqueueBlockEditorAssets()
    {
        $assetsData = include(App::env('plugin.assets_path') . '/block/build/index.asset.php');
        $indexJs = App::env('plugin.assets_url') . 'block/build/index.js';
        $indexCss = App::env('plugin.assets_url') . 'block/build/index.css';
        $preview = App::env('plugin.assets_url') . '/img/preview.png';

        wp_enqueue_script(
            'simplybook-block',
            $indexJs,
            ($assetsData['dependencies'] ?? []),
            ($assetsData['version'] ?? ''),
            true
        );

        wp_localize_script(
            'simplybook-block',
            'simplybook',
            [
                'ajax_url' => admin_url('admin-ajax.php'),
                'rest_url' => get_rest_url(),
                'preview' => $preview,
                'nonce' => wp_create_nonce('simplybook_nonce'),
                'x_wp_nonce' => wp_create_nonce('wp_rest'),
                'rest_namespace' => App::env('http.namespace'),
                'rest_version' => App::env('http.version'),
                'site_url' => site_url(),
                'dashboard_url' => App::env('plugin.dashboard_url'),
                'assets_url' => App::env('plugin.assets_url'),
                'debug' => defined( 'SIMPLYBOOK_DEBUG' ) && SIMPLYBOOK_DEBUG,
            ]
        );

        // Add widget.js script in the header of the page. We need it to be
        // Loaded as soon as possible, as our widgets are dependent on it.
        wp_enqueue_script('simplybookMePl_widget_scripts', App::env('simplybook.widget_script_url'), [], App::env('simplybook.widget_script_version'), false);

        wp_register_style('simplybookMePl_widget_styles', $indexCss, [], App::env('plugin.version'));
        wp_enqueue_style('simplybookMePl_widget_styles');

        wp_set_script_translations('simplybook-block', 'simplybook');
    }

    /**
     * Render the SimplyBook Widget block when the block is displayed on the
     * front-end. Empty values are removed from the attributes array, the "any"
     * value is also removed from the attributes array.
     *
     * @since 3.1.1 No longer filter out 'any', as this is a valid value for the
     * feature: "Any Employee selector" (/v2/management/#plugins/any_unit/)
     */
    public function addWidgetBlock(array $attributes = []): string
    {
        $attributes = array_filter($attributes, function ($value) {
            return !empty($value);
        });

        return '[simplybook_widget' . $this->attributesToString($attributes) . ']';
    }

    /**
     * Convert the attributes array to a string to be used in a shortcode
     */
    private function attributesToString(array $attributes): string
    {
        $result = '';
        foreach ($attributes as $key => $value) {
            $result .= ' ' . sanitize_text_field($key) . '="' . sanitize_text_field($value) . '"';
        }
        return $result;
    }
}