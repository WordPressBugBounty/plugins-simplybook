<?php

namespace SimplyBook\Features\TaskManagement\Tasks;

class AcceptPaymentsTask extends AbstractTask
{
    const IDENTIFIER = 'special_feature_accept_payments';

    /**
     * @inheritDoc
     */
    protected bool $required = true;

    /**
     * @inheritDoc
     */
    protected bool $specialFeature = true;

    /**
     * @inheritDoc
     */
    public function getText(): string
    {
        return esc_html__('Accept payments via SimplyBook.me','simplybook');
    }

    /**
     * @inheritDoc
     */
    public function getAction(): array
    {
        return [
            'type' => 'button',
            'text' => esc_html__('More info','simplybook'),
            'login_link' => 'v2/management/#plugins/paid_events',
        ];
    }
}